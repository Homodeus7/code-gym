import { useState } from "react";
import Hooks from "./tasks/Hooks";
import Components from "./tasks/Components";
import CustomHooks from "./tasks/CustomHooks";
import Context from "./tasks/Context";
import Performance from "./tasks/Performance";
import Forms from "./tasks/Forms";
import "./App.css";

type TabId =
  | "hooks"
  | "components"
  | "custom-hooks"
  | "context"
  | "performance"
  | "forms";

const TABS: { id: TabId; label: string }[] = [
  { id: "hooks", label: "Хуки" },
  { id: "components", label: "Компоненты" },
  { id: "custom-hooks", label: "Кастомные хуки" },
  { id: "context", label: "Context API" },
  { id: "performance", label: "Производительность" },
  { id: "forms", label: "Формы" },
];

function App() {
  const [activeTab, setActiveTab] = useState<TabId>("hooks");

  const renderContent = () => {
    switch (activeTab) {
      case "hooks":
        return <Hooks />;
      case "components":
        return <Components />;
      case "custom-hooks":
        return <CustomHooks />;
      case "context":
        return <Context />;
      case "performance":
        return <Performance />;
      case "forms":
        return <Forms />;
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>React Practice</h1>
        <p className="app-subtitle">Задачи по React 19 + TypeScript</p>
      </header>

      <nav className="tab-nav">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? "tab-btn--active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="app-main">{renderContent()}</main>
    </div>
  );
}

export default App;
