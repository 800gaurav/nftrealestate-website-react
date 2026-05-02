const apiRoutes = {
    buyPlan: (planId) => `/api/v1/user/auth/buy-plan/${planId}`,
    getKyc: `/api/v1/user/auth/get-kyc`,
    updateKyc: `/api/v1/user/auth/my-kyc`,
    singlePlan: (planId) => `api/v1/user/auth/my-Investment/${planId}`,
    allInvestedPlans: `/api/v1/user/auth/get-buy-request`,
    myDownLine: (userId) => `/api/v1/admin/incomehistory/my-downline/${userId}`,
    paymentInfo: `/api/v1/admin/auth/get-payment-info`,
    getPlanDetailsWithCoins: (planId) => `api/v1/admin/auth/get-plan-distribution/${planId}`,
    requestHistory: `/api/v1/user/auth/withdraw/request/history`,
    withdrawRequest :`/api/v1/user/auth/withdraw/request`,
    getPlan : `/api/v1/admin/auth/get-plan`,
}
export default apiRoutes