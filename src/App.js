import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import Main from "./component/Main";
import Join from "./component/Join";
import Login from './component/Login';
import AddJoin from "./component/AddJoin";

import MBTmi from "./component/mbtmi/MBTmi";
import Notice from "./component/notice/NoticeList";
import NoticeDetail from "./component/notice/NoticeDeatil";
import AdminNotice from "./component/admin/AdminNotice";
import AdminNoticeForm from './component/admin/AdminNoticeForm';
import Join from './component/user/Join';
import Header from "./component/common/Header";
import Footer from './component/common/Footer';

function App() {
  return (
    <div className="App">
      {/* <Provider store={store}> */}
      {/* <PersistGate persistor={persister}> */}
      <BrowserRouter>
        <Main/>
        <Header/>
        <Routes>
          <Route exact path="/notice" element={<Notice/>} />
          <Route exact path="/noticeDetail" element={<NoticeDetail/>} />
          <Route exact path="/adminNotice" element={<AdminNotice/>} />
          <Route exact path="/adminNoticeForm" element={<AdminNoticeForm/>} />
          <Route exact path="/mbtmi" element={<MBTmi/>} />
          <Route exact path="/" element={<Main />} />
          <Route exact path="/join" element={<Join />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/addjoin" element={<AddJoin />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
      {/* </PersistGate> */}
      {/* </Provider> */}
    </div>
  );
}

export default App;
