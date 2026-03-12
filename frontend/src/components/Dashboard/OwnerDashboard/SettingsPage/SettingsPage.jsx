import { useState } from "react";
import "./SettingsPage.css";
import EmailSettings from "./EmailSettings";
import PasswordSettings from "./PasswordSettings";
import DeleteAccount from "./DeleteAccount";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("email");

  const renderContent = () => {
    switch (activeTab) {
      case "password":
        return <PasswordSettings />;
      case "delete":
        return <DeleteAccount />;
      default:
        return <EmailSettings />;
    }
  };

  return (
    <div className="settings-wrapper">
      <h2>Settings</h2>
      <p className="settings-subtitle">
        Manage your account preferences securely.
      </p>

      <div className="settings-tabs">
        <button
          className={activeTab === "email" ? "active-tab" : ""}
          onClick={() => setActiveTab("email")}
        >
          Update Email
        </button>

        <button
          className={activeTab === "password" ? "active-tab" : ""}
          onClick={() => setActiveTab("password")}
        >
          Update Password
        </button>

        <button
          className={
            activeTab === "delete"
              ? "active-tab danger-tab"
              : "danger-tab"
          }
          onClick={() => setActiveTab("delete")}
        >
          Delete Account
        </button>
      </div>

      <div className="settings-content">
        {renderContent()}
      </div>
    </div>
  );
}