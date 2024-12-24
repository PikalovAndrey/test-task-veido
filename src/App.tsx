import React from "react";
import "./App.css";
import Table from "./components/Table/Table.tsx";
import { Header } from "./components/Header/Header.tsx";
import { SortFields } from "./components/SortFields/SortFields.tsx";
import { Footer } from "./components/Footer/Footer.tsx";

function App() {
  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <Header />
      <SortFields></SortFields>
      <div className="p-4">
        <Table />
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
