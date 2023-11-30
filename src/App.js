import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import Main from "./component/Main";
import Login from "./component/user/Login";
import AddJoin from "./component/user/AddJoin";

import MBTmi from "./component/mbtmi/MBTmi";
import Notice from "./component/notice/NoticeList";
import NoticeDetail from "./component/notice/NoticeDeatil";
import AdminNotice from "./component/admin/AdminNotice";
import AdminNoticeForm from './component/admin/AdminNoticeForm';
import Join from './component/user/Join';
import MbtyMain from './component/mbty/MbtyMain';
import Mbty from './component/mbty/Mbty';
import Header from "./component/common/Header";
import Footer from "./component/common/Footer";
import MbtyDetail from "./component/mbty/MbtyDetail";
import Mypage from "./component/user/Mypage";
import DefaultMypage from "./component/user/DefaultMypage";
import MbtyWrite from "./component/mbty/MbtyWrite";
import MbtyModify from "./component/mbty/MbtyModify";

function App() {
  return (
    <div className="App">
      {/* <Provider store={store}> */}
      {/* <PersistGate persistor={persister}> */}
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/notice" element={<Notice />} />
          <Route exact path="/noticeDetail" element={<NoticeDetail />} />
          <Route exact path="/adminNotice" element={<AdminNotice />} />
          <Route exact path="/adminNoticeForm" element={<AdminNoticeForm />} />
          <Route exact path="/mbtmi" element={<MBTmi />} />
          <Route exact path="/" element={<Main />} />
          <Route exact path="/join" element={<Join />} />
          <Route exact path="/login" element={<Login />} />
          <Route exect path="/mbtymain" element={<MbtyMain/>}/>
          <Route exect path="/mbty" element={<Mbty/>}/>
          <Route exact path="/addjoin" element={<AddJoin />} />
          <Route exact path="/mbtydetail" element={<MbtyDetail />} /> 
          <Route exact path="/mypage" element={<Mypage/>} />
          <Route exact path="/mbtywrite" element={<MbtyWrite />} /> 
          <Route exact path="/mbtymodify" element={<MbtyModify />} /> 
        </Routes>
        <Footer />
      </BrowserRouter>
      {/* </PersistGate> */}
      {/* </Provider> */}
    </div>
  );
}

export default App;
