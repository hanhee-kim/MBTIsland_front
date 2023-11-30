import React, { useState } from 'react';
import style from '../../css/user/Mypage.module.css';
import { Input, Pagination, PaginationItem, PaginationLink, Table } from 'reactstrap';

const MyMbtWhy = (props) => {
  //더미데이터
  const [whyList,setWhyList] = useState([
    {
      no:1,
      writerId:'test1',
      writerNickname:'test1',
      writerMbti:'test1',
      writerMbtiColor:'#FFD966',
      mbtiType:'ENFP',
      content:'test1test1teest1test1test1test1test11test1test1test1test11test1test1test1test11test1test1test1test11test1test1test1test11test1test1test1test11test1test1test1test1te1test1test1test1test1test1teest1',
      writeDate:'2023-11-11',
      viewCnt:1,
      recommendCnt:1,
      isBlocked:false,
    },
    {
      no:2,
      writerId:'test1',
      writerNickname:'test1',
      writerMbti:'test1',
      writerMbtiColor:'#FFD966',
      mbtiType:'ISTJ',
      content:'test1test1test1test1test1test1test1test1test1',
      writeDate:'2023-10-11',
      viewCnt:10,
      recommendCnt:10,
      isBlocked:false,
    },
    {
      no:3,
      writerId:'test1',
      writerNickname:'test1',
      writerMbti:'test1',
      writerMbtiColor:'#FFD966',
      mbtiType:'ISTJ',
      content:'test1test1test1test1test1test1test1test1test1',
      writeDate:'2023-10-11',
      viewCnt:10,
      recommendCnt:10,
      isBlocked:false,
    },
    {
      no:4,
      writerId:'test1',
      writerNickname:'test1',
      writerMbti:'test1',
      writerMbtiColor:'#FFD966',
      mbtiType:'ISTJ',
      content:'test1test1test1test1test1test1test1test1test1',
      writeDate:'2023-10-11',
      viewCnt:10,
      recommendCnt:10,
      isBlocked:false,
    },
    {
      no:5,
      writerId:'test1',
      writerNickname:'test1',
      writerMbti:'test1',
      writerMbtiColor:'#FFD966',
      mbtiType:'ISTJ',
      content:'test1test1test1test1test1test1test1test1test1',
      writeDate:'2023-10-11',
      viewCnt:10,
      recommendCnt:10,
      isBlocked:false,
    },
    // {
    //   no:6,
    //   writerId:'test1',
    //   writerNickname:'test1',
    //   writerMbti:'test1',
    //   writerMbtiColor:'#FFD966',
    //   mbtiType:'ISTJ',
    //   content:'test1test1test1test1test1test1test1test1test1',
    //   writeDate:'2023-10-11',
    //   viewCnt:10,
    //   recommendCnt:10,
    //   isBlocked:false,
    // }

  ])
  const user = props.user;
  return (
    <div className={style.myMbtwhyContainer}>
      <div className={style.myMbtwhyTitle}>* {user.userNickname}의 MBT-WHY *</div>
      <div style={{padding:"20px"}}>
        <Table className='table-hover' style={{marginTop:'60px'}}>
          <thead>
            <tr className='text-center'>
              <th scope='col' sm={1}><input type='checkbox'/> </th>
              <th scope="col" sm={1}>No</th>
              <th scope="col" sm={2}>To</th>
              <th scope="col" sm={4}>Content</th>
              {/* style={{display: 'block',width: '600px'}} */}
              <th scope="col" sm={3}>WriteDate</th>
              <th scope='col' sm={1}>CommentCnt</th>
            </tr>
          </thead>
          <tbody>
            {whyList.map((why,index) => {
              return(
                <tr>
                <td sm={1}><input type='checkbox'/></td>
                <td key={index} sm={1} className='text-center'>{why.no}</td>
                <td sm={2}>{why.mbtiType}</td>
                <td sm={4} className='text-truncate' style={{maxWidth:'600px'}}>{why.content}</td>
                <td sm={3} className='text-center'>{why.writeDate}</td>
                <td sm={1} className='text-center'>{why.recommendCnt}</td>
              </tr>

              )
            })}
          </tbody>
        </Table>
        {/* pageNation
        npm install @mui/material @emotion/react @emotion/styled
        npm install @mui/material @mui/styled-engine-sc styled-components
        https://mui.com/material-ui/react-pagination/#pagination
        */}
        <div>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li itemClass="page-item">
                <a linkClass="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li itemClass="page-item "><a linkClass="page-link" href="#">1</a></li>
              <li itemClass="page-item"><a linkClass="page-link" href="#">2</a></li>
              <li itemClass="page-item"><a linkClass="page-link" href="#">3</a></li>
              <li itemClass="page-item">
                <a linkClass="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MyMbtWhy;