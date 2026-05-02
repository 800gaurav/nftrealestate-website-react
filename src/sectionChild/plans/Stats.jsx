import React from 'react';
import { TrendingUp, Zap, Users, DollarSign, Shield, Globe, Cpu, BarChart3 } from 'lucide-react';

const Stats = () => {
    return (
        <div className="min-h-screen  text-white py-16 px-4 mt-16 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Jupiter Ecosystem Stats
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Discover the power of Jupiter's decentralized exchange and token economy
                    </p>
                </div>

                {/* Exchange Lifted Section */}
                <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-8 border border-gray-700 mb-16">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold mb-6 flex items-center">
                                <Zap className="h-8 w-8 mr-3 text-blue-400" />
                                Exchange Listed
                            </h2>
                            <p className="text-lg text-gray-300 mb-6">
                                Jupiter operates on a fully decentralized exchange model, eliminating intermediaries and putting control back in the hands of users.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <div className="bg-blue-500/20 p-2 rounded-full mr-4">
                                        <Shield className="h-5 w-5 text-blue-400" />
                                    </div>
                                    <span className="text-gray-300">Fully decentralized architecture</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="bg-blue-500/20 p-2 rounded-full mr-4">
                                        <Globe className="h-5 w-5 text-blue-400" />
                                    </div>
                                    <span className="text-gray-300">Global access without restrictions</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="bg-blue-500/20 p-2 rounded-full mr-4">
                                        <Cpu className="h-5 w-5 text-blue-400" />
                                    </div>
                                    <span className="text-gray-300">Powered by smart contracts</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-8 rounded-2xl border border-gray-700">
                                <div className="text-center mb-6">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-4">
                                        <Zap className="h-8 w-8 text-blue-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold">Decentralized Exchange</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-900/50 p-4 rounded-lg text-center">
                                        <p className="text-sm text-gray-400">Transaction Speed</p>
                                        <p className="text-xl font-bold text-green-400">65,000 TPS</p>
                                    </div>
                                    <div className="bg-gray-900/50 p-4 rounded-lg text-center">
                                        <p className="text-sm text-gray-400">Fees</p>
                                        <p className="text-xl font-bold text-green-400">$0.0001</p>
                                    </div>
                                    <div className="bg-gray-900/50 p-4 rounded-lg text-center">
                                        <p className="text-sm text-gray-400">Uptime</p>
                                        <p className="text-xl font-bold text-green-400">99.99%</p>
                                    </div>
                                    <div className="bg-gray-900/50 p-4 rounded-lg text-center">
                                        <p className="text-sm text-gray-400">Global Users</p>
                                        <p className="text-xl font-bold text-green-400">2M+</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Token Supply Section */}
                <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-8 border border-gray-700 mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center">
                        <DollarSign className="h-8 w-8 mr-3 text-purple-400" />
                        Token Supply
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 p-6 rounded-2xl border border-gray-700 mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center">
                                        <div className="bg-purple-500/20 p-2 rounded-full mr-3">
                                            <DollarSign className="h-5 w-5 text-purple-400" />
                                        </div>
                                        <h3 className="text-xl font-bold">Jupiter Token (JUP)</h3>
                                    </div>
                                    <div className="bg-purple-500/20 px-3 py-1 rounded-full text-sm">
                                        JUP
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                        <span className="text-gray-400">Total Supply:</span>
                                        <span className="text-xl font-bold text-white">7,000,000,000</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                        <span className="text-gray-400">Circulating Supply:</span>
                                        <span className="text-xl font-bold text-white">5,250,000,000</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-gray-400">Market Cap:</span>
                                        <span className="text-xl font-bold text-green-400">$1.55 Billion</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-900/50 p-4 rounded-lg">
                                <h4 className="text-lg font-semibold mb-3">Supply Distribution</h4>
                                <div className="space-y-3">
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm text-gray-400">Liquidity Pool</span>
                                            <span className="text-sm font-medium">40%</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm text-gray-400">Team & Development</span>
                                            <span className="text-sm font-medium">20%</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <div className="bg-purple-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm text-gray-400">Ecosystem Rewards</span>
                                            <span className="text-sm font-medium">25%</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm text-gray-400">Reserve</span>
                                            <span className="text-sm font-medium">15%</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="relative">
                                <div className="w-64 h-64 rounded-full border-4 border-purple-500/30 flex items-center justify-center">
                                    <div className="w-56 h-56 rounded-full border-4 border-blue-500/50 flex items-center justify-center">
                                        <div className="w-48 h-48 rounded-full border-4 border-green-500/40 flex items-center justify-center">
                                            <div className="text-center">
                                                {/* <div className="text-4xl font-bold">Jupiter </div> */}
                                                <img
                                                    src="Images/logo1.png"
                                                    alt="Jupiter Logo"
                                                    className="h-32 w-32  object-contain mt-1"
                                                />
                                                {/* <div className="text-lg text-gray-300 mt-2">7B Supply</div>
                        <div className="text-lg text-green-400 font-semibold mt-1">$1.55B MCap</div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-0 right-0 bg-blue-500/20 rounded-full p-2">
                                    <TrendingUp className="h-5 w-5 text-blue-400" />
                                </div>
                                <div className="absolute bottom-0 left-0 bg-green-500/20 rounded-full p-2">
                                    <Zap className="h-5 w-5 text-green-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Highlights Section */}
                <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-8 border border-gray-700">
                    <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center">
                        <BarChart3 className="h-8 w-8 mr-3 text-green-400" />
                        Key Highlights
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-6 rounded-xl border border-gray-700 hover:border-blue-400 transition-colors">
                            <div className="flex items-center mb-4">
                                <div className="bg-blue-500/20 p-3 rounded-full mr-4">
                                    <Users className="h-6 w-6 text-blue-400" />
                                </div>
                                <h3 className="text-xl font-semibold">Hybrid Model</h3>
                            </div>
                            <p className="text-gray-300">
                                Revolutionary blockchain-based MLM combined with token economy for sustainable growth and rewards.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-purple-500/10 to-green-500/10 p-6 rounded-xl border border-gray-700 hover:border-purple-400 transition-colors">
                            <div className="flex items-center mb-4">
                                <div className="bg-purple-500/20 p-3 rounded-full mr-4">
                                    <Zap className="h-6 w-6 text-purple-400" />
                                </div>
                                <h3 className="text-xl font-semibold">Solana Speed</h3>
                            </div>
                            <p className="text-gray-300">
                                Leveraging the fast Solana blockchain for instant transactions and minimal fees, enhancing user experience.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 p-6 rounded-xl border border-gray-700 hover:border-green-400 transition-colors">
                            <div className="flex items-center mb-4">
                                <div className="bg-green-500/20 p-3 rounded-full mr-4">
                                    <TrendingUp className="h-6 w-6 text-green-400" />
                                </div>
                                <h3 className="text-xl font-semibold">Dual Earnings</h3>
                            </div>
                            <p className="text-gray-300">
                                Members benefit from both network marketing income and token appreciation, maximizing wealth creation.
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 grid md:grid-cols-2 gap-6">
                        <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700">
                            <h3 className="text-xl font-semibold mb-4 flex items-center">
                                <div className="bg-yellow-500/20 p-2 rounded-full mr-3">
                                    <DollarSign className="h-5 w-5 text-yellow-400" />
                                </div>
                                Network Income
                            </h3>
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                                    <span>Multiple income streams from referrals</span>
                                </li>
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                                    <span>Daily rewards and bonuses</span>
                                </li>
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                                    <span>Residual income from team building</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700">
                            <h3 className="text-xl font-semibold mb-4 flex items-center">
                                <div className="bg-green-500/20 p-2 rounded-full mr-3">
                                    <TrendingUp className="h-5 w-5 text-green-400" />
                                </div>
                                Asset Appreciation
                            </h3>
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                                    <span>Token value growth with adoption</span>
                                </li>
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                                    <span>Limited supply of 7 billion tokens</span>
                                </li>
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                                    <span>Utility within Jupiter ecosystem</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center mt-16">
                    <h2 className="text-3xl font-bold mb-6">Join the Jupiter Revolution</h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                        Be part of the future of decentralized finance and network marketing with Jupiter's innovative ecosystem.
                    </p>
                    <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-xl">
                        Get Started with Jupiter
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Stats;