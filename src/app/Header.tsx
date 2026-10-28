// 担当: 1人目 松永（全体設計・メインUI）
// TODO: ヘッダーを作る
import React from "react";

interface HeaderProps {
  updatedAt?: string;
}

export default function Header({ updatedAt = "--:--:--" }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">📊</span>
          <h1 className="text-lg sm:text-xl font-bold text-gray-900">
            食堂混雑状況マップ
          </h1>
        </div>
        <div className="text-xs sm:text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200">
          最終更新: <span className="font-mono text-gray-800">{updatedAt}</span>
        </div>
      </div>
    </header>
  );
}

