import { useState, useEffect, useRef } from "react";
import Tree from "react-d3-tree";
import useAxios from "../utils/useAxios";
import { useAuth } from "../context/AuthContext";
import { UserRound, GitBranch, RefreshCw } from "lucide-react";
import Cookies from "js-cookie";

// ─── helpers ──────────────────────────────────────────────────────────────────
const getUserFromCookie = () => {
  try {
    const raw = Cookies.get("USER");
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return null;
};

const makeNode = (user, isEmpty = false) => {
  if (!user || isEmpty)
    return { name: "Empty", attributes: { isEmpty: true }, children: [] };
  return {
    name: user.name || "N/A",
    attributes: {
      _id: user._id,
      userId: user.userId,
      totalInvested: user.totalInvested || 0,
      isActivated: user.isActivated,
      placementSide: user.placementSide,
      createdAt: user.createdAt,
      isEmpty: false,
      _loaded: false,
    },
    children: [],
  };
};

const inject = (tree, targetId, left, right) => {
  if (!tree) return null;
  if (tree.attributes?._id === targetId) {
    return {
      ...tree,
      attributes: { ...tree.attributes, _loaded: true },
      children: [
        left  ? makeNode(left)  : makeNode(null, true),
        right ? makeNode(right) : makeNode(null, true),
      ],
    };
  }
  return {
    ...tree,
    children: (tree.children || []).map(c => inject(c, targetId, left, right)),
  };
};

// ─── CustomNode ───────────────────────────────────────────────────────────────
const CustomNode = ({ nodeDatum, onNodeClick, onMouseOver, onMouseOut }) => {
  const isEmpty  = nodeDatum.attributes?.isEmpty;
  const isRoot   = nodeDatum.__rd3t?.depth === 0;
  const isActive = nodeDatum.attributes?.isActivated;

  const bg     = isEmpty ? "#1e293b" : isRoot ? "#1e3a8a" : isActive ? "#14532d" : "#78350f";
  const stroke = isEmpty ? "#334155" : isRoot ? "#60a5fa" : isActive ? "#4ade80" : "#fbbf24";

  return (
    <g>
      <circle
        r={26}
        fill={bg}
        stroke={stroke}
        strokeWidth={isEmpty ? 1.5 : 2.5}
        strokeDasharray={isEmpty ? "5 3" : "none"}
        style={{ cursor: isEmpty ? "default" : "pointer", filter: isEmpty ? "none" : "drop-shadow(0 0 6px " + stroke + "55)" }}
        onClick={() => !isEmpty && onNodeClick(nodeDatum)}
        onMouseOver={(e) => !isEmpty && onMouseOver(nodeDatum, e)}
        onMouseOut={onMouseOut}
      />

      {!isEmpty ? (
        <foreignObject x="-12" y="-12" width="24" height="24" style={{ pointerEvents: "none" }}>
          <div xmlns="http://www.w3.org/1999/xhtml"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
            <UserRound style={{ width: 16, height: 16, color: "white" }} />
          </div>
        </foreignObject>
      ) : (
        <text fill="#475569" fontSize={10} textAnchor="middle" dy={4} style={{ pointerEvents: "none" }}>+</text>
      )}

      {/* Label */}
      <foreignObject x="33" y="-26" width="160" height="60" style={{ pointerEvents: "none" }}>
        <div xmlns="http://www.w3.org/1999/xhtml" style={{ fontFamily: "system-ui, sans-serif", lineHeight: 1.3 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: isEmpty ? "#475569" : "#f8fafc" }}>
            {isEmpty ? "Empty Slot" : (nodeDatum.name.length > 15 ? nodeDatum.name.slice(0, 15) + "…" : nodeDatum.name)}
          </div>
          {!isEmpty && (
            <>
              <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 2 }}>
                {nodeDatum.attributes?.userId || "—"}
              </div>
              <div style={{ fontSize: 10, fontWeight: 600, color: isActive ? "#4ade80" : "#fbbf24", marginTop: 2 }}>
                {isActive ? "● Active" : "○ Inactive"} · ${nodeDatum.attributes?.totalInvested || 0}
              </div>
            </>
          )}
          {isEmpty && (
            <div style={{ fontSize: 9, color: "#334155", marginTop: 2 }}>Available position</div>
          )}
        </div>
      </foreignObject>
    </g>
  );
};

// ─── Tooltip ──────────────────────────────────────────────────────────────────
const Tooltip = ({ user, pos }) => {
  if (!user) return null;
  const active = user.isActivated;
  return (
    <div style={{
      position: "fixed", left: pos.x + 16, top: pos.y + 16,
      background: "#0f172a", border: "1px solid #1e40af",
      borderRadius: 14, padding: 16, width: 268, zIndex: 9999,
      pointerEvents: "none", boxShadow: "0 25px 60px rgba(0,0,0,0.7)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div style={{
          width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
          background: active ? "#14532d" : "#78350f",
          border: `2px solid ${active ? "#4ade80" : "#fbbf24"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "white", fontWeight: 800, fontSize: 17,
        }}>
          {(user.name || "?")[0].toUpperCase()}
        </div>
        <div>
          <p style={{ color: "white", fontWeight: 700, fontSize: 14, margin: 0 }}>{user.name}</p>
          <p style={{ color: "#94a3b8", fontSize: 11, margin: "2px 0 0" }}>{user.userId}</p>
        </div>
        <span style={{
          marginLeft: "auto", fontSize: 9, fontWeight: 700,
          padding: "3px 8px", borderRadius: 999, flexShrink: 0,
          background: active ? "#052e16" : "#431407",
          color: active ? "#86efac" : "#fde68a",
          border: `1px solid ${active ? "#4ade80" : "#fbbf24"}44`,
        }}>
          {active ? "Active" : "Inactive"}
        </span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
        {[
          ["User ID",  user.userId || "N/A"],
          ["Invested", `$${user.totalInvested || 0}`],
          ["Position", user.placementSide || "Root"],
          ["Joined",   user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-IN") : "N/A"],
        ].map(([label, value]) => (
          <div key={label} style={{ background: "#1e293b", borderRadius: 8, padding: "6px 10px" }}>
            <p style={{ color: "#64748b", fontSize: 9, margin: 0, textTransform: "uppercase", letterSpacing: 0.8 }}>{label}</p>
            <p style={{ color: "white", fontSize: 12, fontWeight: 600, margin: "2px 0 0" }}>{value}</p>
          </div>
        ))}
      </div>
      <p style={{ color: "#334155", fontSize: 9, textAlign: "center", marginTop: 10, margin: "10px 0 0" }}>
        Click to load children
      </p>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function BinaryTreePage() {
  const { currentUser } = useAuth();
  const { fetchData }   = useAxios();

  const [tree,    setTree]    = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);
  const [hovered, setHovered] = useState(null);
  const [pos,     setPos]     = useState({ x: 0, y: 0 });
  const [rootId,  setRootId]  = useState(null);
  const didLoad = useRef(false);

  // Resolve rootId from currentUser or cookie — runs once
  useEffect(() => {
    const u = currentUser || getUserFromCookie();
    if (!u) return;
    // Prefer MongoDB _id, fallback to userId string
    const id = u._id || u.id || u.userId;
    if (id) setRootId(id);
  }, [currentUser]);

  const loadTree = async (id, isRoot = false) => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetchData({
        url: `/api/v1/user/profile/get-left-right-user/${id}`,
      });
      // useAxios fetchData returns the full axios response.data object
      // which is { success, message, data }
      const user = res?.data ?? res;

      if (!user || typeof user !== "object") {
        setError("User data not found"); return;
      }

      if (isRoot) {
        const root = makeNode(user);
        root.children = [
          user.leftChild  ? makeNode(user.leftChild)  : makeNode(null, true),
          user.rightChild ? makeNode(user.rightChild) : makeNode(null, true),
        ];
        root.attributes._loaded = true;
        setTree(root);
      } else {
        setTree(prev =>
          JSON.parse(JSON.stringify(inject(prev, id, user.leftChild, user.rightChild)))
        );
      }
    } catch (e) {
      console.error("Tree load error:", e);
      setError("Failed to load tree. Check console.");
    } finally {
      setLoading(false);
    }
  };

  // Load tree when rootId is set — only once
  useEffect(() => {
    if (rootId && !didLoad.current) {
      didLoad.current = true;
      loadTree(rootId, true);
    }
  }, [rootId]);

  const handleClick = (nd) => {
    if (nd.attributes?.isEmpty || nd.attributes?._loaded) return;
    const id = nd.attributes?._id;
    if (id) loadTree(id, false);
  };

  const handleOver = (nd, e) => {
    setHovered({ ...nd.attributes, name: nd.name });
    setPos({ x: e.clientX, y: e.clientY });
  };

  const reset = () => {
    didLoad.current = false;
    setTree(null);
    if (rootId) {
      didLoad.current = true;
      loadTree(rootId, true);
    }
  };

  const centerX = typeof window !== "undefined" ? window.innerWidth / 2 - 80 : 500;

  return (
    <div style={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column", background: "#020617", overflow: "hidden" }}>

      {/* Header */}
      <div style={{ background: "#0d1525", borderBottom: "1px solid #1e293b", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "#0f172a", border: "1px solid #1e3a5f", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <GitBranch size={18} color="#38bdf8" />
          </div>
          <div>
            <h1 style={{ color: "white", fontWeight: 700, fontSize: 17, margin: 0 }}>Binary Team Tree</h1>
            <p style={{ color: "#64748b", fontSize: 11, margin: "3px 0 0" }}>
              {rootId ? `ID: ${rootId}` : "Loading..."} · Hover to preview · Click to expand
            </p>
          </div>
        </div>
        <button onClick={reset} style={{ display: "flex", alignItems: "center", gap: 6, background: "#1e293b", border: "1px solid #334155", color: "#94a3b8", padding: "8px 18px", borderRadius: 10, cursor: "pointer", fontSize: 13, flexShrink: 0 }}>
          <RefreshCw size={13} /> Reset
        </button>
      </div>

      {/* Canvas */}
      <div style={{ flex: 1, position: "relative" }}>

        {loading && (
          <div style={{ position: "absolute", inset: 0, zIndex: 20, background: "rgba(2,6,23,0.75)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", border: "3px solid #38bdf8", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />
            <p style={{ color: "#94a3b8", marginTop: 14, fontSize: 13 }}>Loading tree...</p>
          </div>
        )}

        {error && !loading && (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
            <p style={{ color: "#f87171", fontSize: 14 }}>⚠ {error}</p>
            <button onClick={reset} style={{ background: "#1e293b", border: "1px solid #334155", color: "#94a3b8", padding: "8px 22px", borderRadius: 10, cursor: "pointer", fontSize: 13 }}>
              Retry
            </button>
          </div>
        )}

        {!tree && !loading && !error && (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <p style={{ color: "#475569", fontSize: 14 }}>Waiting for user data...</p>
          </div>
        )}

        {tree && !loading && (
          <Tree
            data={tree}
            renderCustomNodeElement={(p) => (
              <CustomNode {...p} onNodeClick={handleClick} onMouseOver={handleOver} onMouseOut={() => setHovered(null)} />
            )}
            orientation="vertical"
            translate={{ x: centerX, y: 100 }}
            separation={{ siblings: 2, nonSiblings: 2.5 }}
            nodeSize={{ x: 240, y: 160 }}
            pathFunc="diagonal"
            zoom={0.75}
            scaleExtent={{ min: 0.2, max: 3 }}
            styles={{
              links: {
                stroke: "#3b82f6",
                strokeWidth: 2,
                fill: "none",
              },
            }}
          />
        )}

        <Tooltip user={hovered} pos={pos} />

        {/* Legend */}
        <div style={{ position: "absolute", bottom: 20, left: 20, background: "#0d1525", border: "1px solid #1e293b", borderRadius: 12, padding: "14px 16px" }}>
          <p style={{ color: "#475569", fontWeight: 700, fontSize: 10, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 10px" }}>Legend</p>
          {[
            { fill: "#1e3a8a", stroke: "#60a5fa", label: "Root / You" },
            { fill: "#14532d", stroke: "#4ade80", label: "Active Member" },
            { fill: "#78350f", stroke: "#fbbf24", label: "Inactive Member" },
            { fill: "#1e293b", stroke: "#475569", label: "Empty Slot", dashed: true },
          ].map(({ fill, stroke, label, dashed }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
              <svg width={16} height={16}>
                <circle cx={8} cy={8} r={6} fill={fill} stroke={stroke} strokeWidth={1.5} strokeDasharray={dashed ? "3 2" : "none"} />
              </svg>
              <span style={{ color: "#94a3b8", fontSize: 11 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        /* react-d3-tree connector lines */
        .rd3t-link {
          stroke: #3b82f6 !important;
          stroke-width: 2px !important;
          fill: none !important;
        }
        /* all text inside tree white */
        .rd3t-tree-container text,
        .rd3t-tree-container tspan {
          fill: white !important;
        }
      `}</style>
    </div>
  );
}
