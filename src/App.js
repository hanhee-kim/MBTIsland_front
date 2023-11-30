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
import MbtwhyMain from './component/mbtwhy/MbtwhyMain';
import Mbtwhy from './component/mbtwhy/Mbtwhy';
import Header from "./component/common/Header";
import Footer from "./component/common/Footer";
import MbtwhyDetail from "./component/mbtwhy/MbtwhyDetail";
import Mypage from "./component/user/Mypage";
import DefaultMypage from "./component/user/DefaultMypage";
import MbtwhyWrite from "./component/mbtwhy/MbtwhyWrite";
import MbtwhyModify from "./component/mbtwhy/MbtwhyModify";
import MBattle from "./component/mbattle/MBattle";
import MBattleWrite from "./component/mbattle/MBattleWrite";

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
          <Route exect path="/mbtwhymain" element={<MbtwhyMain/>}/>
          <Route exect path="/mbtwhy" element={<Mbtwhy/>}/>
          <Route exact path="/addjoin" element={<AddJoin />} />
          <Route exact path="/mbtwhydetail" element={<MbtwhyDetail />} /> 
          <Route exact path="/mypage" element={<Mypage/>} />
          <Route exact path="/mbtwhywrite" element={<MbtwhyWrite />} /> 
          <Route exact path="/mbtwhymodify" element={<MbtwhyModify />} /> 
          <Route exact path="/mbattle" element={<MBattle />} />
          <Route exact path="/mbattlewrite" element={<MBattleWrite />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      {/* </PersistGate> */}
      {/* </Provider> */}
    </div>
  );
}

export default App;
