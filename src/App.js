import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { useState } from "react";
import Main from "./component/Main";
import Login from "./component/user/Login";
import AddJoin from "./component/user/AddJoin";
import MBTmi from "./component/mbtmi/MBTmi";
import Notice from "./component/notice/NoticeList";
import NoticeDetail from "./component/notice/NoticeDeatil";
import AdminNotice from "./component/admin/AdminNotice";
import AdminNoticeForm from "./component/admin/AdminNoticeForm";
import Join from "./component/user/Join";
import Header from "./component/common/Header";
import Footer from "./component/common/Footer";
import MBTmiDetail from "./component/mbtmi/MBTmiDetail";
import MBTmiForm from "./component/mbtmi/MBTmiForm";
import AdminQna from "./component/admin/AdminQna";
import Mypage from "./component/user/Mypage";
import DefaultMypage from "./component/user/DefaultMypage";
import QnAWrite from "./component/user/QnAWrite";
import MbtwhyMain from "./component/mbtwhy/MbtwhyMain";
import Mbtwhy from "./component/mbtwhy/Mbtwhy";
import MbtwhyDetail from "./component/mbtwhy/MbtwhyDetail";
import MbtwhyWrite from "./component/mbtwhy/MbtwhyWrite";
import MbtwhyModify from "./component/mbtwhy/MbtwhyModify";
import MBattle from "./component/mbattle/MBattle";
import MBattleWrite from "./component/mbattle/MBattleWrite";
import MBattleDetail from "./component/mbattle/MBattleDetail";
import AdminFrame from "./component/admin/AdminFrame";
import persistStore from "redux-persist/es/persistStore";
import store from "./persist-store";
import NoteWrite from "./component/user/NoteWrite";
import MyMbtWhy from "./component/user/MyMbtWhy";
import MyMbtmi from "./component/user/MyMbtmi";
import MyQnA from "./component/user/MyQnA";
import MyBookmark from './component/user/MyBookmark';
import MyAlarm from './component/user/MyAlarm';
import MyNote from './component/user/MyNote';

export const persistor = persistStore(store);
function App() {
  const [isPopup, setIsPopup] = useState(false);

  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            {!isPopup && <Header />}
            <Routes>
              {/* 한희 */}
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/join" element={<Join />} />
              <Route exact path="/addjoin" element={<AddJoin />} />
              <Route exact path="/mypage" element={<Mypage />} >
                {/* <Route exact path=":profile" element={<DefaultMypage/>}/>
                <Route exact path=":mbtwhy" element={<MyMbtWhy/>}/>
                <Route exact path=":mbtmi" element={<MyMbtmi/>}/>
                <Route exact path=":qna" element={<MyQnA/>}/>
                <Route exact path=":bookmark" element={<MyBookmark/>}/>
                <Route exact path=":alarm" element={<MyAlarm/>}/>
                <Route exact path=":note" element={<MyNote/>}/> */}
              </Route>
              <Route
                exact
                path="/qnaWrite"
                element={<QnAWrite setIsPopup={setIsPopup} />}
              />
              <Route
                exact
                path="/noteWrite"
                element={<NoteWrite setIsPopup={setIsPopup} />}
              />
              {/* 하영 */}
              <Route exact path="/" element={<Main />} />
              <Route exact path="/mbtmi" element={<MBTmi />} />
              <Route exact path="/mbtmidetail" element={<MBTmiDetail />} />
              <Route exact path="/mbtmiform" element={<MBTmiForm />} />
              <Route exact path="/notice" element={<Notice />} />
              <Route exact path="/noticedetail" element={<NoticeDetail />} />
              <Route exact path="/adminnotice" element={<AdminFrame />} />
              <Route exact path="/adminnoticeform" element={<AdminFrame />} />
              <Route exact path="/adminqna" element={<AdminFrame />} />
              <Route exact path="/adminqnaform" element={<AdminFrame />} />
              {/* 인수 */}
              <Route exect path="/mbtwhymain" element={<MbtwhyMain />} />
              <Route exect path="/mbtwhy" element={<Mbtwhy />} />
              <Route exact path="/addjoin" element={<AddJoin />} />
              <Route exact path="/mbtwhydetail" element={<MbtwhyDetail />} />
              <Route exact path="/mypage" element={<Mypage />} />
              <Route exact path="/mbtwhywrite" element={<MbtwhyWrite />} />
              <Route exact path="/mbtwhymodify" element={<MbtwhyModify />} />
              <Route exact path="/mbattle" element={<MBattle />} />
              <Route exact path="/mbattlewrite" element={<MBattleWrite />} />
              <Route exact path="/mbattledetail" element={<MBattleDetail />} />
            </Routes>
            {!isPopup && <Footer />}
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
