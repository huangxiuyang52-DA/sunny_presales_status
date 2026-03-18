import React, { useState, useEffect } from "react";
import {
  Trophy,
  Target,
  Briefcase,
  TrendingUp,
  CheckCircle2,
  Clock,
  FileText,
  PieChart,
  BarChart3,
} from "lucide-react";

// 去識別化後的專案資料
const initialProjects = [
  {
    id: 1,
    name: "F精密製造",
    industry: "金屬/零件製造",
    amount: 450,
    status: "已成交",
    tags: ["中英文提案", "系統演練", "硬體報價"],
  },
  {
    id: 2,
    name: "A光電科技",
    industry: "電子/光電",
    amount: 430,
    status: "已成交",
    tags: ["系統Demo", "技術顧問", "需求初探"],
  },
  {
    id: 3,
    name: "Y連鎖餐飲",
    industry: "食品/餐飲",
    amount: 300,
    status: "已成交",
    tags: ["WMS規劃", "SAP串接", "高層簡報"],
  },
  {
    id: 4,
    name: "F金屬工業",
    industry: "傳統製造",
    amount: 300,
    status: "已成交",
    tags: ["線邊倉設計", "痛點診斷", "報價估算"],
  },
  {
    id: 5,
    name: "F娛樂設備",
    industry: "組裝製造",
    amount: 250,
    status: "已成交",
    tags: ["規格溝通", "報表規劃", "無製程報工"],
  },
  {
    id: 6,
    name: "E傳統產業",
    industry: "傳統製造",
    amount: 250,
    status: "已成交",
    tags: ["需求訪談", "系統架構展示"],
  },
  {
    id: 7,
    name: "K科技",
    industry: "科技製造",
    amount: 250,
    status: "簽約中",
    tags: ["URS對照", "系統藍圖", "硬體建議"],
  },
  {
    id: 8,
    name: "K實業",
    industry: "綜合實業",
    amount: 200,
    status: "簽約中",
    tags: ["現場調研", "功能範圍釐清"],
  },
  {
    id: 9,
    name: "X生技廠",
    industry: "生物科技",
    amount: null,
    status: "提案中",
    tags: ["APS排程", "複雜邏輯梳理"],
  },
  {
    id: 10,
    name: "D物流通",
    industry: "物流倉儲",
    amount: null,
    status: "提案中",
    tags: ["作業流程梳理", "系統骨架繪製"],
  },
];

export default function App() {
  // 確保 Tailwind CSS 正常載入 (解決 CodeSandbox 等環境設定不完全導致的破圖問題)
  useEffect(() => {
    if (!document.getElementById("tailwind-cdn")) {
      const script = document.createElement("script");
      script.id = "tailwind-cdn";
      script.src = "https://cdn.tailwindcss.com";
      document.head.appendChild(script);
    }
  }, []);

  const [filter, setFilter] = useState("All");

  // 計算 KPI 數據
  const wonProjects = initialProjects.filter((p) => p.status === "已成交");
  const signingProjects = initialProjects.filter((p) => p.status === "簽約中");

  const totalWonAmount = wonProjects.reduce(
    (sum, p) => sum + (p.amount || 0),
    0
  );
  const totalSigningAmount = signingProjects.reduce(
    (sum, p) => sum + (p.amount || 0),
    0
  );
  const totalPipelineAmount = totalWonAmount + totalSigningAmount;

  // 動態計算圓餅圖的百分比 (營收佔比)
  const wonPercent =
    totalPipelineAmount > 0
      ? Math.round((totalWonAmount / totalPipelineAmount) * 100)
      : 0;
  const signingPercent = totalPipelineAmount > 0 ? 100 - wonPercent : 0;

  // 動態尋找最大專案金額作為長條圖的 100% 基準
  const maxProjectAmount = Math.max(
    ...[...wonProjects, ...signingProjects].map((p) => p.amount || 0),
    1
  );

  // 過濾列表資料
  const displayedProjects = initialProjects.filter((p) => {
    if (filter === "All") return true;
    return p.status === filter;
  });

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="text-blue-600" />
              2025~2026Presales與提案績效儀表板
            </h1>
            <p className="text-slate-500 mt-1">
              MES / WMS 等系統導入前期架構規劃與商業轉化
            </p>
          </div>
          <div className="mt-4 md:mt-0 px-4 py-2 bg-blue-50 text-blue-700 font-semibold rounded-lg text-sm border border-blue-100">
            年度總影響營收：
            <span className="text-lg">{totalPipelineAmount} 萬</span>
          </div>
        </header>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            title="已成交營收"
            value={`${totalWonAmount} 萬`}
            icon={<Trophy className="w-6 h-6 text-emerald-500" />}
            subtitle={`來自 ${wonProjects.length} 件大型專案`}
            color="emerald"
          />
          <KpiCard
            title="簽約中營收"
            value={`${totalSigningAmount} 萬`}
            icon={<Clock className="w-6 h-6 text-amber-500" />}
            subtitle={`共 ${signingProjects.length} 件專案推進中`}
            color="amber"
          />
          <KpiCard
            title="總提案數"
            value={`${initialProjects.length}+ 件`}
            icon={<Briefcase className="w-6 h-6 text-indigo-500" />}
            subtitle="包含前期概念驗證(POC)"
            color="indigo"
          />
          <KpiCard
            title="核心售前技能"
            value="跨界SI整合"
            icon={<Target className="w-6 h-6 text-rose-500" />}
            subtitle="需求釐清 / 架構規劃 / 報價"
            color="rose"
          />
        </div>

        {/* Charts & Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bar Chart Section */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-slate-500" />
              成交與推進中專案營收分佈
            </h2>
            <div className="space-y-4">
              {/* 加入 || 0 讓 TypeScript 確保運算不會碰到 null */}
              {[...wonProjects, ...signingProjects]
                .sort((a, b) => (b.amount || 0) - (a.amount || 0))
                .map((project) => (
                  <div key={project.id} className="relative">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-slate-700">
                        {project.name}{" "}
                        <span className="text-xs text-slate-400 font-normal">
                          ({project.industry})
                        </span>
                      </span>
                      <span className="font-semibold text-slate-900">
                        {project.amount} 萬
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden flex items-center">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ease-out ${
                          project.status === "已成交"
                            ? "bg-gradient-to-r from-emerald-400 to-emerald-500"
                            : "bg-gradient-to-r from-amber-300 to-amber-400"
                        }`}
                        style={{
                          width: `${
                            ((project.amount || 0) / maxProjectAmount) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Quick Stats / Donut representation */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-slate-500" />
                狀態分佈 (營收佔比)
              </h2>
              <div className="relative pt-4 pb-8 flex justify-center">
                {/* 採用更穩定的 conic-gradient 繪製甜甜圈圖 */}
                <div
                  className="w-48 h-48 rounded-full flex items-center justify-center relative shadow-sm"
                  style={{
                    background: `conic-gradient(#10b981 0% ${wonPercent}%, #fbbf24 ${wonPercent}% 100%)`,
                  }}
                >
                  {/* 內部挖空圓形 */}
                  <div className="text-center z-10 bg-white w-36 h-36 rounded-full flex flex-col items-center justify-center shadow-inner">
                    <span className="text-3xl font-bold text-slate-800">
                      {wonProjects.length + signingProjects.length}
                    </span>
                    <span className="text-xs text-slate-500 mt-1">
                      有效成案
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 mt-4">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-sm font-medium text-slate-700">
                    已成交 ({wonProjects.length}件)
                  </span>
                </div>
                <span className="text-sm font-bold text-slate-900">
                  {wonPercent}%
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <span className="text-sm font-medium text-slate-700">
                    簽約中 ({signingProjects.length}件)
                  </span>
                </div>
                <span className="text-sm font-bold text-slate-900">
                  {signingPercent}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Project Details Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <FileText className="w-5 h-5 text-slate-500" />
              專案參與明細與核心貢獻
            </h2>

            {/* Filter Pills */}
            <div className="flex gap-2">
              {["All", "已成交", "簽約中", "提案中"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    filter === status
                      ? "bg-slate-800 text-white shadow-md"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {status === "All" ? "全部" : status}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-sm">
                  <th className="p-4 font-medium">專案代稱 (產業)</th>
                  <th className="p-4 font-medium text-right">合約金額</th>
                  <th className="p-4 font-medium">狀態</th>
                  <th className="p-4 font-medium">我的提案貢獻 / 亮點</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {displayedProjects.map((project) => (
                  <tr
                    key={project.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="font-medium text-slate-800">
                        {project.name}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {project.industry}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      {project.amount ? (
                        <span className="font-semibold text-slate-700">
                          {project.amount} 萬
                        </span>
                      ) : (
                        <span className="text-slate-400 text-sm">-</span>
                      )}
                    </td>
                    <td className="p-4">
                      <StatusBadge status={project.status} />
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100/50"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-components
function KpiCard({ title, value, icon, subtitle, color }) {
  const bgColors = {
    emerald: "bg-emerald-50",
    amber: "bg-amber-50",
    indigo: "bg-indigo-50",
    rose: "bg-rose-50",
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center">
      <div className="flex items-center gap-4 mb-3">
        <div className={`p-3 rounded-xl ${bgColors[color]}`}>{icon}</div>
        <div className="text-sm font-medium text-slate-500">{title}</div>
      </div>
      <div>
        <div className="text-2xl font-bold text-slate-800">{value}</div>
        <div className="text-xs text-slate-400 mt-1">{subtitle}</div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  if (status === "已成交") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
        <CheckCircle2 className="w-3 h-3" />
        已成交
      </span>
    );
  }
  if (status === "簽約中") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold border border-amber-200">
        <Clock className="w-3 h-3" />
        簽約中
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold border border-slate-200">
      <FileText className="w-3 h-3" />
      提案中
    </span>
  );
}
