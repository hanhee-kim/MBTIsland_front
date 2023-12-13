import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { useEffect, useState } from "react";
import { persistStore } from "redux-persist";
import store from "./persist-store";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

// 한희
import Login from "./component/user/Login";
import Join from "./component/user/Join";
import AddJoin from "./component/user/AddJoin";
import Mypage from "./component/user/Mypage";
import QnAWrite from "./component/user/QnAWrite";
import NoteWrite from "./component/user/NoteWrite";
import NoteDetail from "./component/user/NoteDetail";
// import DefaultMypage from "./component/user/DefaultMypage";
import OAuth2User from "./component/user/OAuth2User";
import Logout from "./component/user/Logout";

// 하영
import ScrollReset from "./component/common/ScrollReset";
import Main from "./component/Main";
import Header from "./component/common/Header";
import Footer from "./component/common/Footer";
import MBTmi from "./component/mbtmi/MBTmi";
import MBTmiDetail from "./component/mbtmi/MBTmiDetail";
import MBTmiForm from "./component/mbtmi/MBTmiForm";
import Notice from "./component/notice/Notice";
import NoticeDetail from "./component/notice/NoticeDetail";
import AdminFrame from "./component/admin/AdminFrame";

// 인수
import MbtwhyMain from "./component/mbtwhy/MbtwhyMain";
import Mbtwhy from "./component/mbtwhy/Mbtwhy";
import MbtwhyDetail from "./component/mbtwhy/MbtwhyDetail";
import MbtwhyWrite from "./component/mbtwhy/MbtwhyWrite";
import MbtwhyModify from "./component/mbtwhy/MbtwhyModify";
import MBattle from "./component/mbattle/MBattle";
import MBattleDetail from "./component/mbattle/MBattleDetail";
import MBattleWrite from "./component/mbattle/MBattleWrite";
import ReportWrite from "./component/user/ReportWrite";
import QuestionDetail from "./component/user/QuestionDetail";

export const persistor = persistStore(store);

// App.js 또는 index.js 등에서 초기화할 때
const initApp = () => {
  // beforeunload 이벤트 핸들러 등록
  window.addEventListener("beforeunload", handleBeforeUnload);

  // 나머지 초기화 작업...
};
const handleBeforeUnload = () => {
  // 브라우저 창이 닫힐 때 로컬 스토리지 내용을 지움
  persistor.purge();
};

function App() {
  const [isPopup, setIsPopup] = useState(false);
  // useEffect(() => {
  //   window.onbeforeunload = () => {
  //     persistor.purge();
  //     localStorage.removeItem('token');
  //     localStorage.removeItem('user');
  //   };
  // }, []);
  // App 컴포넌트 내부에서 useEffect 등을 사용하여 initApp 호출
  useEffect(() => {
    initApp();

    // 컴포넌트가 언마운트될 때 이벤트 핸들러 제거
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <ScrollReset />
            {!isPopup && <Header />}
            <Routes>
              {/* 한희 */}
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/join" element={<Join />} />
              <Route exact path="/addjoin" element={<AddJoin />} />
              <Route exact path="/mypage" element={<Mypage />}>
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
                path="/questiondetail/:no"
                element={<QuestionDetail setIsPopup={setIsPopup} />}
              />

              <Route
                exact
                path="/qnawrite"
                element={<QnAWrite setIsPopup={setIsPopup} />}
              />
              <Route
                exact
                path="/notedetail/:noteNo"
                element={<NoteDetail setIsPopup={setIsPopup} />}
              />
              <Route
                exact
                path="/notewrite/:receiveName/:receiveNick"
                element={<NoteWrite setIsPopup={setIsPopup} />}
              />
              <Route
                exect
                path="/oauth/redirect/:token/:loginType"
                element={<OAuth2User />}
              />
              <Route exact path="/logout" element={<Logout />} />

              {/* 하영 */}
              <Route exact path="/" element={<Main />} />
              <Route exact path="/mbtmi" element={<MBTmi />} />
              <Route
                exact
                path="/mbtmidetail/:no/:category?/:type?/:search?/:page?"
                element={<MBTmiDetail />}
              />
              <Route exact path="/mbtmiform" element={<MBTmiForm />} />
              <Route exact path="/notice" element={<Notice />} />
              <Route
                exact
                path="/noticedetail/:no/:search?/:page?"
                element={<NoticeDetail />}
              />
              <Route exact path="/adminnotice" element={<AdminFrame />} />
              <Route exact path="/adminnoticeform" element={<AdminFrame />} />
              <Route exact path="/adminqna" element={<AdminFrame />} />
              <Route exact path="/adminqnaform" element={<AdminFrame />} />

              {/* 인수 */}
              <Route exect path="/mbtwhymain" element={<MbtwhyMain />} />
              <Route exect path="/mbtwhy/:mbti" element={<Mbtwhy />} />
              <Route
                exact
                path="/mbtwhydetail/:mbti?/:page?/:search?/:no?"
                element={<MbtwhyDetail />}
              />
              <Route exact path="/mbtwhywrite" element={<MbtwhyWrite />} />
              <Route exact path="/mbtwhymodify" element={<MbtwhyModify />} />
              <Route exact path="/mbattle" element={<MBattle />} />
              <Route exact path="/mbattlewrite" element={<MBattleWrite />} />
              <Route exact path="/mbattledetail" element={<MBattleDetail />} />
              <Route exact path="/adminreport" element={<AdminFrame />} />
              <Route exact path="/adminreportdetail" element={<AdminFrame />} />
              <Route exact path="/adminban" element={<AdminFrame />} />
              <Route exact path="/adminbandetail" element={<AdminFrame />} />
              <Route
                exact
                path="/reportwrite/:reportedId/:reportedTable"
                element={<ReportWrite setIsPopup={setIsPopup} />}
              />
            </Routes>
            {!isPopup && <Footer />}
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
