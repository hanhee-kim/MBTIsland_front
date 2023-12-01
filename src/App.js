import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import Main from "./component/Main";
import Login from "./component/user/Login";
import AddJoin from "./component/user/AddJoin";

import MBTmi from "./component/mbtmi/MBTmi";
import Notice from "./component/notice/NoticeList";
import NoticeDetail from "./component/notice/NoticeDeatil";
import AdminNotice from "./component/admin/AdminNotice";
import AdminNoticeForm from "./component/admin/AdminNoticeForm";
import Join from "./component/user/Join";
import MbtyMain from "./component/mbty/MbtyMain";
import Mbty from "./component/mbty/Mbty";
import Header from "./component/common/Header";
import Footer from "./component/common/Footer";
import MbtyDetail from "./component/mbty/MbtyDetail";
import MBTmiDetail from "./component/mbtmi/MBTmiDetail";
import MBTmiForm from "./component/mbtmi/MBTmiForm";
import AdminQna from "./component/admin/AdminQna";
import Mypage from "./component/user/Mypage";
import DefaultMypage from "./component/user/DefaultMypage";
import MbtyWrite from "./component/mbty/MbtyWrite";
import MbtyModify from "./component/mbty/MbtyModify";
import QnAWrite from "./component/user/QnAWrite";
import { useState } from "react";

function App() {
  const [isPopup, setIsPopup] = useState(false);

  return (
    <div className="App">
      {/* <Provider store={store}> */}
      {/* <PersistGate persistor={persister}> */}
      <BrowserRouter>
        {!isPopup && <Header />}
        <Routes>
          {/* 한희 */}
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/join" element={<Join />} />
          <Route exact path="/addjoin" element={<AddJoin />} />
          <Route exact path="/mypage" element={<Mypage />} />
          <Route
            exact
            path="/qnaWrite"
            element={<QnAWrite setIsPopup={setIsPopup} />}
          />
          {/* 하영 */}
          <Route exact path="/" element={<Main />} />
          <Route exact path="/mbtmi" element={<MBTmi />} />
          <Route exact path="/mbtmidetail" element={<MBTmiDetail />} />
          <Route exact path="/mbtmiform" element={<MBTmiForm />} />
          <Route exact path="/notice" element={<Notice />} />
          <Route exact path="/noticedetail" element={<NoticeDetail />} />
          <Route exact path="/adminnotice" element={<AdminNotice />} />
          <Route exact path="/adminnoticeform" element={<AdminNoticeForm />} />
          <Route exact path="/adminqna" element={<AdminQna />} />
          <Route exect path="/mbtymain" element={<MbtyMain />} />
          {/* 인수 */}
          <Route exect path="/mbty" element={<Mbty />} />
          <Route exact path="/mbtydetail" element={<MbtyDetail />} />
          <Route exact path="/mbtydetail" element={<MbtyDetail />} />
          <Route exact path="/mbtywrite" element={<MbtyWrite />} />
          <Route exact path="/mbtymodify" element={<MbtyModify />} />
        </Routes>
        {!isPopup && <Footer />}
      </BrowserRouter>
      {/* </PersistGate> */}
      {/* </Provider> */}
    </div>
  );
}

export default App;
