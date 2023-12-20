import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import {
    Pagination,
    PaginationItem,
    PaginationLink,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button,
    Input
} from "reactstrap";
import {
    BarChart,
    Bar,
    Rectangle,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import axios from 'axios';

import style from "../../css/mbattle/MBattleDetail.module.css";

function MBattleDetail() {
    // 로그인 유저 정보
    const user = useSelector((state) => state.persistedReducer.user.user);

    // Mbattle 게시글
    const [mbattle, setMbattle] = useState({});

    // 글 번호, 댓글 페이지 번호
    const {no, page} = useParams();

    // 투표 여부
    const [isVoted, setIsVoted] = useState(false);

    // 북마크 여부
    const [isBookmarked, setIsBookmarked] = useState(false);

    // const [board, setBoard] = useState(
    //     {
    //         num:1,
    //         mbti:"INTP",
    //         color:"#9BB7D4",
    //         writer:"마춤뻡파괴왕",
    //         date:"1일전",
    //         title:"똥맛 카레 vs 카레맛 똥",
    //         subject1:"똥맛 카레",
    //         subject2:"카레맛 똥",
    //         file1:"",
    //         file2:"",
    //         commentCount:2,
    //         likeCount:1,
    //         viewCount:23
    //     }
    // );

    const [comments, setComments] = useState([
        {
            num:1,
            mbti:"ISTP",
            color:"#4D6879",
            writer:"마춤뻡파괴왕",
            date:"1일전",
            content:"머요",
        },
        {
            num:2,
            mbti:"ISTP",
            color:"#4D6879",
            writer:"난앓아요",
            date:"1일전",
            content:"방귀뿡뿡"
        },
        {
            num:3,
            mbti:"ISTP",
            color:"#4D6879",
            writer:"면발이억수로부드럽네",
            date:"1일전",
            content:"쌀국수 뚝배기!면발이 억수로 부드럽네 한 뚝배기 하실래예?"
        },
        {
            num:4,
            mbti:"ISTP",
            color:"#4D6879",
            writer:"억장이문어찜",
            date:"1일전",
            content:"내공냠냠"
        },
        {
            num:5,
            mbti:"ISTP",
            color:"#4D6879",
            writer:"빵빵이",
            date:"1일전",
            content:"옥지얌"
        }
    ]);

    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];
    
    // 페이징 상태 값
    const [pageBtn, setPageBtn] = useState([]);
    const [pageInfo, setPageInfo] = useState({});

    // 댓글 상태 값
    const [comment, setComment] = useState({num:"", mbti:"", writer:"", date:"", content:""});

    // 정렬 드롭다운 open 여부
    const [open, setOpen] = useState(false);

    // pageChange 함수를 호출한 페이징 영역에서 페이징 항목(1, 2, 3...)들을 인자로 받아옴
    const pageChange = (repage) => {
        // getMbattleDetail();
    };

    useEffect(()=> {
        getMbattleDetail();
    }, []);

    // url에 파라미터로 줄 변수 repage
    const getMbattleDetail = () => {
        let defaultUrl = `http://localhost:8090/mbattledetail/${no}`;
        defaultUrl += `&username=${user.username}`;

        axios.get(defaultUrl)
        .then(res=> {
            console.log(res);
            let mbattle = res.data.mbattle;
            let isMbattleVoted = res.data.isMbattleVoted;
            let isMbattleBookmarked = res.data.isMbattleBookmarked;

            // 게시글 set
            setMbattle(mbattle);

            // 로그인한 유저에게 투표되어 있다면 (투표 데이터 존재한다면)
            if(isMbattleVoted) {
                setIsVoted(!isVoted);
            }

            if(isMbattleBookmarked) {
                setIsBookmarked(!isBookmarked);
            }

            // let pageInfo = res.data.pageInfo;
            // let list = res.data.commentList;

            // setComments([...list]);
            
            // let btn = [];
            // for(let i = pageInfo.startPage;i <= pageInfo.endPage;i++) {
            //     btn.push(i)
            // }
            // setPageBtn(btn);
            // setPageInfo({...pageInfo});
        })
        .catch(err=> {
            console.log(err);
            setMbattle({});
        })
    };

    // 댓글 상태 값 변경
    const change = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setComment({...comment, [name]:value});
    }

    const handleToggle = () => {
        setOpen(!open);
    };

    const random = (e) => {

    };

    const dropDownStyle = {
        display:"flex",
        border:"none",
        boxShadow:"none",
        backgroundColor:"white",
    }

    const buttonStyle = {
        background:"none",
        color:"black",
        border:"1px solid #C5C5C5"
    }

    const replyButtonStyle = {
        background:"none",
        color:"#C5C5C5",
        fontWeight:"bold",
        border:"none",
        padding:"0px"
    }

    const inputComment = {
        height:"100px",
        resize:"none"
    }

    const boardVoteButton = {
        fontWeight:"bold",
        fontSize:"small",
        backgroundColor:"#1FAB70",
        lineHeight:"10px"
    }

    return (
        <div className={style.container}>
            {/* 중앙 영역 */}
            <div className={style.sectionCenter}>
                {/* 게시판 헤더 영역 */}
                <div className={style.pageHeader}>
                    <h1>M-Battle</h1>
                </div>

                {/* 수직 중간 영역 */}
                <div>
                {/* 게시글 영역 */}
                    <div key={mbattle.no} className={style.sectionBoard}>
                        {/* <Link to={"/detailform/only-detail/" + mbattle.no}></Link> */}
                        <div className={style.boardTitle}>
                            <h1>{mbattle.title}</h1>
                            <div> 
                                <img src="/randomIcon.png" height="30px" alt="" onClick={random} />
                                <ButtonDropdown direction="down" isOpen={open} toggle={handleToggle}>
                                    <DropdownToggle style={dropDownStyle}>
                                        <img className={style.dropDownImg} src="/popover-icon.png" alt=""></img>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>신고</DropdownItem>
                                    </DropdownMenu>
                                </ButtonDropdown>
                            </div>
                            {/* <ButtonDropdown direction="down" isOpen={open} toggle={handleToggle}>
                                <DropdownToggle style={dropDownStyle}>
                                    <img className={style.dropDownImg} src="/popover-icon.png"></img>
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>삭제</DropdownItem>
                                </DropdownMenu>
                            </ButtonDropdown> */}
                            
                        </div>
                        <div className={style.writerDiv}>
                            <div className={style.circleDiv} style={{backgroundColor:`${mbattle.mbtiColor}`}}> </div>&nbsp;&nbsp;&nbsp;
                            {mbattle.mbtiCategori}&nbsp;&nbsp;&nbsp;
                            {mbattle.writerId}
                        </div>
                        <div style={{color:"#C5C5C5"}}>
                            {mbattle.writeDate}
                            <img className={style.viewIcon} src="/viewIcon-bold.png" alt=""></img>
                            {mbattle.viewCnt}
                        </div>

                        {/* 투표 영역 */}
                        <div className={style.sectionVote}>
                            <div>
                                <div className={style.subject}>
                                    <img src="/vsIcon.png" alt=""/>
                                    <h4>ㅋㅋㅋㅋㅋㅋㅋㅋzzzzzㅋㅋㅋㅋㅋㅋ</h4>
                                </div>
                                <div className={style.voteButtonDiv}>
                                    <Button style={boardVoteButton}>투표하기</Button>
                                </div>
                            </div>
                            <div style={{margin:"30px"}}>
                                <img src="/vsIcon.png" alt=""/>
                            </div>
                            <div>
                                <div className={style.subject}>
                                    <img src="/vsIcon.png" alt=""/>
                                </div>
                                <div className={style.voteButtonDiv}>
                                    <Button style={boardVoteButton}>투표하기</Button>
                                </div>
                            </div>
                        </div>

                        {/* 통계 영역 */}
                        <div style={{width:"600px", height:"400px"}}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={data}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5
                                    }}
                                >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="uv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                                <Bar dataKey="pv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div style={{width:"600px", height:"400px"}}>
                            <ResponsiveContainer>
                                <BarChart data={data} layout="vertical">
                                    <YAxis type="name"/>
                                    <XAxis type="number" orientation="top" stroke="#285A64"/>
                                    <Bar dataKey="uv" fill="#8884d8" background={{ fill: '#eee' }} barSize={{height:"10px"}}/>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div style={{width:"600px", height:"400px"}}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart width={150} height={40} data={data} layout="vertical">
                                    <YAxis/>
                                    <Bar dataKey="uv" fill="#8884d8" background={{ fill: '#eee' }}/>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div>
                            <BarChart
                                width={430}
                                height={170}
                                data={data}
                                layout="vertical">
                                <XAxis type="number" orientation="top"/>
                                <YAxis type="category" dataKey="currency" axisLine={false} dx={-5} tickLine={false} 
                                    style={{ fill: "#285A64" }} />
                                <Bar background dataKey="uv" fill="#285A64" barSize={{ height: 300 }}>
                                    
                                </Bar>
                            </BarChart>
                        </div>

                        <div className={style.boardLow}>
                            <div className={style.bookmarkDiv}>
                                <img src="/bookmark.png" alt=""></img>&nbsp;
                                
                            </div>
                            {/* <div className={style.thumbDiv}>
                                <img src="/thumbIcon.png" alt=""></img>&nbsp;
                                추천&nbsp;
                                {mbattle.likeCount}
                            </div> */}
                            <div className={style.listDiv}>
                                <Button style={buttonStyle}>목록</Button>
                            </div>
                        </div>
                    </div>
                    <div className={style.commentCountDiv}>
                        <div>
                            댓글&nbsp;
                            {/* {mbattle.commentCount} */}
                        </div>
                    </div>
                </div>
                {/* 게시글 영역 */}
                
                {/* 댓글 영역 */}
                <div>
                    {/* 댓글 목록 */}
                    {comments.length !== 0 && comments.map(comment => {
                        return (
                            <div key={comment.num} className={style.sectionComment}>
                                <div className={style.writerDiv}>
                                    <div>
                                        <div className={style.circleDiv} style={{backgroundColor:`${comment.color}`}}> </div>&nbsp;&nbsp;&nbsp;
                                        {comment.mbti}&nbsp;&nbsp;&nbsp;
                                        {comment.writer}
                                    </div>
                                </div>
                                <div className={style.boardContent}>
                                    {comment.content}
                                </div>
                                <div className={style.commentLowDiv}>
                                    <div>
                                        {comment.date}
                                    </div>
                                    <Button style={replyButtonStyle}>신고</Button>
                                </div>
                            </div>
                        )
                    })}

                    {/* 삭제된 댓글 */}
                    <div className={style.sectionDeletedComment}>
                        삭제된 댓글입니다.
                    </div>

                    {/* 페이징 영역 */}
                    <Pagination aria-label="Page navigation example" className={style.pagingLabel}>
                        {
                            pageInfo.curPage===1?
                            <PaginationItem disabled>
                                <PaginationLink previous href="#" />
                            </PaginationItem>:
                            <PaginationItem>
                                {/* <PaginationLink previous href={"/list/" + (pageInfo.curPage - 1)} /> */}
                                <PaginationLink previous onClick={()=>pageChange(pageInfo.curPage-1)}/>
                            </PaginationItem>
                        }

                        {                   
                            pageBtn.map(item=>{
                                return(
                                    <PaginationItem key={item} className={item===pageInfo.curPage? 'active':''}>
                                        {/* <PaginationLink href={"/list/" + item}> */}
                                        {/* 고유한 id를 넘겨줌 */}
                                        <PaginationLink onClick={() => pageChange(item)}>
                                            {item}
                                        </PaginationLink>
                                    </PaginationItem>                            
                                )
                            })
                        }

                        {
                            <PaginationItem disabled={pageInfo.curPage === pageInfo.endPage}>
                                {/* <PaginationLink next href={"/list/" + (pageInfo.curPage + 1)}/> */}
                                <PaginationLink next onClick={()=>pageChange(pageInfo.curPage+1)}/>
                            </PaginationItem>
                        }
                    </Pagination>

                    {/* 댓글 달기 */}
                    <div>
                        <Input
                            style={inputComment}
                            type="textarea"
                            id="content"
                            name="content"
                            onChange={change}
                            cols="40"
                            rows="15"
                            required="required"
                            value={comment.content}
                            placeholder="댓글을 입력해주세요."
                        />
                        <div className={style.postCommentDiv}>
                            <Button style={buttonStyle}>등록</Button>
                        </div>
                    </div>

                </div>
                {/* 댓글 영역 */}
            </div>
        </div>
    );
}

export default MBattleDetail;
