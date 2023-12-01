const Main = () => {
  return (
    <>
      <h2>-</h2>
      <div style={{width:'300px', minHeight:'800px', border: '3px dashed gold', marginTop: '65px', marginLeft: '100px'}}>
        <li>
          <a href="/notice">공지사항 리스트</a>
        </li>
        <li>
          <a href="/noticedetail">공지사항 글상세</a>
        </li>
        <li>
          <a href="/adminnotice">관리자페이지 공지사항 리스트</a>
        </li>
        <li>
          <a href="/adminnoticeform">관리자페이지 공지사항 작성폼</a>
        </li>
        <li>
          <a href="/adminqna">관리자페이지 문의 리스트</a>
        </li>
        <li>
          <a href="/adminqnaform">관리자페이지 문의 답변하기</a>
        </li>
        <li>
          <a href="/mbtmi">mbtmi 리스트</a>
        </li>
        <li>
          <a href="/mbtmidetail">mbtmi 글상세</a>
        </li>
        <li>
          <a href="/mbtmiform">mbtmi 작성폼</a>
        </li>
      </div>
    </> 
  );
};

export default Main;
