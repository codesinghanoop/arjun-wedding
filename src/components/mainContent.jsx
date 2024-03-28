import { useEffect } from 'react';
import AOS from 'aos';
import Confetti from 'https://cdn.skypack.dev/canvas-confetti';
import '../App.css'
import { useState } from 'react';

export const MainContent = () => {
    const documentApi = document.getElementById('progress-info');
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState('');
    const [name, setName] = useState('');
    const [confirmation, setConfirm] = useState(1);
    const [replyData, setReplyData] = useState({});

    //Timer
    const timer = () => {
        let countDownDate = (new Date(document.getElementById('wakth').getAttribute('data-upcoming').replace(' ', 'T'))).getTime();

        setInterval(() => {
            let distance = Math.abs(countDownDate - (new Date()).getTime());

            document.getElementById('day').innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
            document.getElementById('hour').innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            document.getElementById('minute').innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            document.getElementById('second').innerText = Math.floor((distance % (1000 * 60)) / 1000);
        }, 1000);
    };

    //request
    const request = (method, path) => {
        let req = {
            method: method.toUpperCase(),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
    
        return {
            async then(...params) {
                return fetch("BASE_URL" + path, req)
                    .then((res) => res.json())
                    .then((res) => {
                        console.log('the response is',res);
                        // if (res?.error !== null) {
                        //     throw res?.error?.[0];
                        // }
                        return res;
                    })
                    .then(...params);
            },
            // token(token) {
            //     req.headers['Authorization'] = 'Bearer ' + token;
            //     return this;
            // },
            body(body) {
                req.body = JSON.stringify(body);
                return this;
            },
        };
    };

    //Audio
    const audio = (() => {
        let audio = null;
    
        const singleton = () => {
            if (!audio) {
                audio = new Audio();
                audio.src = document.getElementById('tombol-musik').getAttribute('data-url');
                audio.load();
                audio.currentTime = 0;
                audio.autoplay = true;
                audio.muted = false;
                audio.loop = true;
                audio.volume = 1;
            }
    
            return audio;
        };
    
        return {
            play: () => singleton().play(),
            pause: () => singleton().pause(),
        };
    })();

    //Utils
    const util = (() => {

        const opacity = (nama) => {
            let nm = document.getElementById(nama);
            let op = parseInt(nm.style.opacity);
            let clear = null;
    
            clear = setInterval(() => {
                if (op >= 0) {
                    nm.style.opacity = op.toString();
                    op -= 0.025;
                } else {
                    clearInterval(clear);
                    clear = null;
                    nm.remove();
                    return;
                }
            }, 10);
        };
    
        const escapeHtml = (unsafe) => {
            return unsafe
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');
        };
    
        const music = (btn) => {
            if (btn.getAttribute('data-status') !== 'true') {
                btn.setAttribute('data-status', 'true');
                audio.play();
                btn.innerHTML = '<i class="fa-solid fa-circle-pause spin-button"></i>';
            } else {
                btn.setAttribute('data-status', 'false');
                audio.pause();
                btn.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
            }
        };
    
        // const modal = (img) => {
        //     document.getElementById('show-modal-image').src = img.src;
        //     (new bootstrap.Modal('#modal-image')).show();
        // };
    
        // const tamu = () => {
        //     let name = (new URLSearchParams(window.location.search)).get('to');
    
        //     if (!name) {
        //         document.getElementById('nama-tamu').remove();
        //         return;
        //     }
    
        //     let div = document.createElement('div');
        //     div.classList.add('m-2');
        //     div.innerHTML = `<p class="mt-0 mb-1 mx-0 p-0 text-light">Kepada Yth Bapak/Ibu/Saudara/i</p><h2 class="text-light">${escapeHtml(name)}</h2>`;
    
        //     document.getElementById('form-nama').value = name;
        //     document.getElementById('nama-tamu').appendChild(div);
        // };
    
        const animation = () => {
            const duration = 15 * 1000;
            const animationEnd = Date.now() + duration;
            const colors = ["#FFC0CB", "#FF1493", "#C71585"];
    
            const randomInRange = (min, max) => {
                return Math.random() * (max - min) + min;
            };
    
            const heart = Confetti.shapeFromPath({
                path: 'M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z',
                matrix: [0.03333333333333333, 0, 0, 0.03333333333333333, -5.566666666666666, -5.533333333333333]
            });
    
            (function frame() {
                const timeLeft = animationEnd - Date.now();
    
                colors.forEach((color) => {
                    Confetti({
                        particleCount: 1,
                        startVelocity: 0,
                        ticks: Math.max(50, 75 * (timeLeft / duration)),
                        origin: {
                            x: Math.random(),
                            y: Math.abs(Math.random() - (timeLeft / duration)),
                        },
                        zIndex: 1057,
                        colors: [color],
                        shapes: [heart],
                        drift: randomInRange(-0.5, 0.5),
                        gravity: randomInRange(0.5, 1),
                        scalar: randomInRange(0.5, 1),
                    });
                });
    
                if (timeLeft > 0) {
                    requestAnimationFrame(frame);
                }
            })();
        };
    
        const buka = async (button) => {
            // button.disabled = true;
            document.querySelector('body').style.overflowY = 'scroll';
            // AOS.init();
            audio.play();
    
            // if (localStorage.getItem('alertClosed')) {
            //     document.getElementById('alertDiv').style.display = 'none';
            // }
    
            opacity('welcome');
            document.getElementById('tombol-musik').style.display = 'block';
            // timer();
    
            Confetti({
                origin: { y: 0.9 },
                zIndex: 1057
            });
            // await session.check();
            animation();
        };
    
        const show = () => {
            // tamu();
            opacity('loading');
            window.scrollTo(0, 0);
        };
    
        const animate = (svg, timeout, classes) => {
            let handler = null;
    
            handler = setTimeout(() => {
                svg.classList.add(classes);
                handler = null;
            }, timeout);
        };
    
        return {
            buka,
            // modal,
            music,
            escapeHtml,
            show,
            animate
        };
    })();

    useEffect(() => {
        request('GET', '/').then((data) => setComments(data.reverse()));
        AOS.init();
        timer();
        // util.buka();
    }, [])

    const innerComment = (data) => {
        return (
        <div>
            <div className="d-flex flex-wrap justify-content-between align-items-center">
                <div className="d-flex flex-wrap justify-content-start align-items-center">
                    <button style={{ fontSize: "0.8rem" }} onClick={() => onClickReply(data?.user?.username, data?.createdAt, data?.content, data?._id)} data-uuid={data._id} className="btn btn-sm btn-outline-dark rounded-3 py-0">Reply</button>
                    {/* ${owns.has(data.uuid)
                    ? `
                    <button style="font-size: 0.8rem;" onclick="comment.edit(this)" data-uuid="${data.uuid}" className="btn btn-sm btn-outline-dark rounded-3 py-0 ms-1">Ubah</button>
                    <button style="font-size: 0.8rem;" onclick="comment.hapus(this)" data-uuid="${data.uuid}" className="btn btn-sm btn-outline-dark rounded-3 py-0 ms-1">Hapus</button>`
                    : ''} */}
                </div>
                <button style={{ fontSize: "0.8rem" }} onClick={() => onLikeComment(data?._id, data?.score)} data-uuid={data._id} className="btn btn-sm btn-outline-dark rounded-2 py-0 px-0">
                    <div className="d-flex justify-content-start align-items-center">
                        <p className="my-0 mx-1" >{data?.score} {data?.score === 1 ? 'like' : 'likes'}</p>
                        <i className={`py-1 me-1 p-0 fa-solid fa-heart text-danger`}></i>
                    </div>
                </button>
            </div>
            {data?.replies?.length ? innerCard(data?.replies) : null}
        </div>
        );
    };

    const innerCard = (replies) => {
        return replies.map((reply) => (
            <div class="card-body border-start bg-light py-2 ps-2 pe-0 my-2 ms-2 me-0" id={reply._id}>
                <div class="d-flex flex-wrap justify-content-between align-items-center">
                    <p class="text-dark text-truncate m-0 p-0" style={{ fontSize: "0.95rem"}}>
                        <strong>{reply.user.username}</strong>
                    </p>
                    <small class="text-dark m-0 p-0" style={{ fontSize: "0.75rem"}}>{new Date(reply.createdAt).toLocaleString()}</small>
                </div>
                <hr class="text-dark my-1" />
                <p style={{ textAlign: 'left' }} class="text-dark mt-0 mb-1 mx-0 p-0">{reply.content}</p>
                {/* {innerComment(replies)} */}
            </div>
        ));
    };

    const renderCard = (data) => {
        return (
        <div className="mb-3">
            <div className="card-body bg-light shadow p-3 m-0 rounded-4" data-parent="true" id={data._id}>
                <div className="d-flex flex-wrap justify-content-between align-items-center">
                    <p className="text-dark text-truncate m-0 p-0" style={{ fontSize: "0.95rem"}}>
                        <strong className="me-1">{data.user?.username}</strong><i className={`fa-solid ${data.attend ? 'fa-circle-check text-success' : 'fa-circle-xmark text-danger'}`}></i>
                    </p>
                    <small className="text-dark m-0 p-0" style={{ fontSize: "0.75rem"}}>{new Date(data.createdAt).toLocaleString()}</small>
                </div>
                <hr className="text-dark my-1" />
                <p style={{ textAlign: 'left' }} className="text-dark mt-0 mb-1 mx-0 p-0">{data.content}</p>
                {innerComment(data)}
            </div>
        </div>);
    };

    const onChangeContent = (e) => {
        setContent(e.target.value);
    }

    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const onChangeAttend = (e) => {
        setConfirm(e.target.value);
    }

    const submitComment = () => {
        if(content && name) {
            request('POST', '/').body({
                "content": content,
                "score": 0,
                "user": {
                    "username": name
                },
                "attend": confirmation,
                "replies": []
            }).then(() => {
                alert('Comment Posted');
                request('GET', '/').then((data) => setComments(data?.reverse()));
                setName('');
                setContent('');
            });
        } else {
            alert('Please fill all the fields');
        }
    }

    const onClickReply = async (name, createdAt, content, id) => {
        setReplyData({
            id,
            replyingTo: name
        })
        setName('');
        setContent('');
        const buttonBatal = document.getElementById('batal');
        const buttonBalas = document.getElementById('balas');
        const buttonUbah = document.getElementById('ubah');
        const buttonKirim = document.getElementById('kirim');
        const replyCard = document.getElementById('balasan');
        buttonKirim.style.display = 'none';
        buttonBatal.style.display = 'block';
        buttonBalas.style.display = 'block';
        document.getElementById('label-kehadiran').style.display = 'none';
        document.getElementById('form-kehadiran').style.display = 'none';
        replyCard.style.display = 'block';
        document.getElementById('balasan').innerHTML = `
        <div class="my-3">
            <h6>Reply to</h6>
            <div id="id-balasan" class="card-body bg-light shadow p-3 rounded-4">
                <div class="d-flex flex-wrap justify-content-between align-items-center">
                    <p class="text-dark text-truncate m-0 p-0" style={{ fontSize: "0.95rem"}}>
                        <strong>${name}</strong>
                    </p>
                    <small class="text-dark m-0 p-0" style={{fontSize: "0.75rem"}}>${new Date(createdAt).toLocaleString()}</small>
                </div>
                <hr class="text-dark my-1" />
                <p style={{ textAlign: 'left' }} class="text-dark m-0 p-0">${content}</p>
            </div>
        </div>`;
        document.getElementById('comment').scrollIntoView({ behavior: 'smooth' });
        // button.disabled = false;
        // button.innerText = tmp;
    };

    const onSendReply = () => {
        console.log('replyData',replyData);
        const buttonBatal = document.getElementById('batal');
        const buttonBalas = document.getElementById('balas');
        const buttonUbah = document.getElementById('ubah');
        const buttonKirim = document.getElementById('kirim');
        const replyCard = document.getElementById('balasan');
        
        
        if(!name || !content) {
            alert('Please fill all the details');
            return;
        }
        request('POST', `/${replyData?.id}/replies`).body({
            replyingTo: name,
            content,
            user: {
                username: name
            }
        }).then(() => {
            alert('Reply sent');
            request('GET', '/').then((data) => setComments(data.reverse()));
            buttonKirim.style.display = 'block';
            buttonBatal.style.display = 'none';
            buttonBalas.style.display = 'none';
            replyCard.style.display = 'none';
            document.getElementById('label-kehadiran').style.display = 'block';
            document.getElementById('form-kehadiran').style.display = 'block';
            setName('');
            setContent('');
        })
    }

    const onCancel = () => {
        const buttonBatal = document.getElementById('batal');
        const buttonBalas = document.getElementById('balas');
        const buttonUbah = document.getElementById('ubah');
        const buttonKirim = document.getElementById('kirim');
        const replyCard = document.getElementById('balasan');
        
        buttonKirim.style.display = 'block';
        buttonBatal.style.display = 'none';
        buttonBalas.style.display = 'none';
        replyCard.style.display = 'none';
        document.getElementById('label-kehadiran').style.display = 'block';
        document.getElementById('form-kehadiran').style.display = 'block';
        setName('');
        setContent('');
    }

    const onLikeComment = (id, currentScore) => {
        request('put', `/${id}`).body({
            score: Number(currentScore) + 1,
        }).then(() => {
            request('GET', '/').then((data) => setComments(data.reverse()));
        })
    }

    return (
    <div>
        <main style={{ backgroundColor: 'black' }} className="text-light" data-bs-spy="scroll" data-bs-target="#navbar-menus" data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true" tabIndex="0">

        {/* Home */}
        <section className="container" id="home">

            <div className="text-center pt-4">
                <h1 className="font-esthetic my-4" style={{fontSize: "2.5rem"}}>Wedding invitation</h1>

                <div className="py-4">
                    <div className="img-crop border border-3 border-light shadow mx-auto">
                        <img src="./assets/images/couple2.png" alt="bg" />
                    </div>
                </div>

                <h1 className="font-esthetic my-4" style={{fontSize: "3rem"}}>Manpreet & Prabhjeet</h1>
                <p className="mb-0" style={{fontSize: "1.5rem"}}>Monday, April 1 2024</p>

                <a className="btn btn-outline-light btn-sm shadow rounded-pill px-3 my-2" target="_blank" href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=The%20Wedding%20of%20Manpreet%20and%20Prabhjeet&details=The%20Wedding%20of%20Manpreet%20and%20Prabhjeet%20%7C%2002%20April%202024%20%7C%20%2010%20%20:00&dates=20240401T100000/20240402T110000&location=https://maps.app.goo.gl/V3AfgLjgrYciVMho9">
                    <i className="fa-solid fa-calendar-check me-2"></i>Save The Date
                </a>

                <div className="d-flex justify-content-center align-items-center mt-4 mb-2">
                    <div className="mouse-animation">
                        <div className="scroll-animation"></div>
                    </div>
                </div>

                <p className="m-0">Scroll Down</p>
            </div>
        </section>

        {/* <!-- Wave Separator --> */}
        <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#111111" fillOpacity="1" d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,165.3C672,160,768,96,864,96C960,96,1056,160,1152,154.7C1248,149,1344,75,1392,37.3L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>

        {/* <!-- dark section --> */}
        <section className="dark-section" id="couple">

            <div className="text-center">
                <h1 className="font-arabic py-4 px-2" style={{fontSize: "2rem"}}>In the name of God, the most gracious, the most merciful</h1>

                {/* <!-- Love animation --> */}
                <div className="position-relative">
                    <div id='first-heart' className="position-absolute" style={{ top: "0%", right: "10%"}}>
                        <svg xmlns="https://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="opacity-50 animate-love" viewBox="0 0 16 16">
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                        </svg>
                    </div>
                </div>

                <h1 className="font-esthetic py-4 px-2" style={{fontSize: "2rem"}}>ਵਾਹਿਗੁਰੂ ਤੇਰੇ ਤੇ ਮਿਹਰਾਂ ਭਰਿਆ ਹੱਥ ਰੱਖੇ</h1>

                <p className="pb-3 px-3">
                    With all due respect. We invite you and your family to attend our wedding:
                </p>

                {/* <!-- Love animation --> */}
                <div className="position-relative">
                    <div className="position-absolute" style={{ top: "0%", left: "10%"}}>
                        <svg xmlns="https://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="opacity-50 animate-love" viewBox="0 0 16 16">
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                        </svg>
                    </div>
                </div>

                <div className="overflow-x-hidden">

                    <div data-aos="fade-right" data-aos-duration="2000">
                        <div className="img-crop border border-3 border-light shadow my-4 mx-auto">
                            <img src="./assets/images/groom.png" alt="cowo" />
                        </div>
                        <h1 className="font-esthetic" style={{fontSize: "3rem"}}>Manpreet Singh</h1>
                        <p className="mt-3 mb-0" style={{fontSize: "1.25rem"}}>S/O</p>
                        <p className="mb-0">Mrs Gurpreet Kaur & Mr Harjeet Singh</p>
                    </div>

                    {/* <!-- Love animation --> */}
                    <div className="position-relative">
                        <div className="position-absolute" style={{ top: "0%", right: "10%"}}>
                            <svg xmlns="https://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="opacity-50 animate-love" viewBox="0 0 16 16">
                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                            </svg>
                        </div>
                    </div>

                    <h1 className="font-esthetic my-4" style={{fontSize: "4rem"}}>&</h1>

                    {/* <!-- Love animation --> */}
                    <div className="position-relative">
                        <div className="position-absolute" style={{ top: "0%", left: "10%"}}>
                            <svg xmlns="https://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="opacity-50 animate-love" viewBox="0 0 16 16">
                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                            </svg>
                        </div>
                    </div>

                    <div data-aos="fade-left" data-aos-duration="2000">
                        <div className="img-crop border border-3 border-light shadow my-4 mx-auto">
                            <img src="./assets/images/bride.png" alt="cewe" />
                        </div>
                        <h1 className="font-esthetic" style={{fontSize: "3rem"}}>Prabhjeet Kaur</h1>
                        <p className="mt-3 mb-0" style={{fontSize: "1.25rem"}}>D/O</p>
                        <p className="mb-0">Mrs Surindar Kaur & Mr Baljeet Singh</p>
                    </div>
                </div>

                {/* <!-- Ballon animation --> */}
                <div className="position-relative">
                    <div className="position-absolute" style={{ top: "0%", right: "5%"}}>
                        <svg xmlns="https://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="opacity-50 animate-love" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="m8 2.42-.717-.737c-1.13-1.161-3.243-.777-4.01.72-.35.685-.451 1.707.236 3.062C4.16 6.753 5.52 8.32 8 10.042c2.479-1.723 3.839-3.29 4.491-4.577.687-1.355.587-2.377.236-3.061-.767-1.498-2.88-1.882-4.01-.721zm-.49 8.5c-10.78-7.44-3-13.155.359-10.063q.068.062.132.129.065-.067.132-.129c3.36-3.092 11.137 2.624.357 10.063l.235.468a.25.25 0 1 1-.448.224l-.008-.017c.008.11.02.202.037.29.054.27.161.488.419 1.003.288.578.235 1.15.076 1.629-.157.469-.422.867-.588 1.115l-.004.007a.25.25 0 1 1-.416-.278c.168-.252.4-.6.533-1.003.133-.396.163-.824-.049-1.246l-.013-.028c-.24-.48-.38-.758-.448-1.102a3 3 0 0 1-.052-.45l-.04.08a.25.25 0 1 1-.447-.224l.235-.468ZM6.013 2.06c-.649-.18-1.483.083-1.85.798-.131.258-.245.689-.08 1.335.063.244.414.198.487-.043.21-.697.627-1.447 1.359-1.692.217-.073.304-.337.084-.398"></path>
                        </svg>
                    </div>
                </div>

            </div>
        </section>

        {/* <!-- Wave Separator --> */}
        <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#111111" fillOpacity="1" d="M0,192L40,181.3C80,171,160,149,240,149.3C320,149,400,171,480,165.3C560,160,640,128,720,128C800,128,880,160,960,186.7C1040,213,1120,235,1200,218.7C1280,203,1360,149,1400,122.7L1440,96L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path>
        </svg>

        {/* <!--  --> */}
        <div className="container">
            <div className="text-center" data-aos="fade-up" data-aos-duration="2000">

                <h1 className="font-esthetic mt-0 mb-3" style={{fontSize: "2rem"}}>
                    Best wishes
                </h1>

                <p style={{fontSize: "0.9rem"}} className="px-2">
                    I’m eagerly waiting for your kind presence to bless my mama and maami for their marital bliss.
                </p>

                <span className="mb-0"><strong>Gunnu</strong></span>
            </div>
        </div>

        {/* <!-- Ballon animation --> */}
        <div className="position-relative">
            <div className="position-absolute" style={{ top: "0%", left: "5%"}}>
                <svg xmlns="https://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="opacity-50 animate-love" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="m8 2.42-.717-.737c-1.13-1.161-3.243-.777-4.01.72-.35.685-.451 1.707.236 3.062C4.16 6.753 5.52 8.32 8 10.042c2.479-1.723 3.839-3.29 4.491-4.577.687-1.355.587-2.377.236-3.061-.767-1.498-2.88-1.882-4.01-.721zm-.49 8.5c-10.78-7.44-3-13.155.359-10.063q.068.062.132.129.065-.067.132-.129c3.36-3.092 11.137 2.624.357 10.063l.235.468a.25.25 0 1 1-.448.224l-.008-.017c.008.11.02.202.037.29.054.27.161.488.419 1.003.288.578.235 1.15.076 1.629-.157.469-.422.867-.588 1.115l-.004.007a.25.25 0 1 1-.416-.278c.168-.252.4-.6.533-1.003.133-.396.163-.824-.049-1.246l-.013-.028c-.24-.48-.38-.758-.448-1.102a3 3 0 0 1-.052-.45l-.04.08a.25.25 0 1 1-.447-.224l.235-.468ZM6.013 2.06c-.649-.18-1.483.083-1.85.798-.131.258-.245.689-.08 1.335.063.244.414.198.487-.043.21-.697.627-1.447 1.359-1.692.217-.073.304-.337.084-.398"></path>
                </svg>
            </div>
        </div>

        {/* <!-- Wave Separator --> */}
        <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#111111" fillOpacity="1" d="M0,96L30,106.7C60,117,120,139,180,154.7C240,171,300,181,360,186.7C420,192,480,192,540,181.3C600,171,660,149,720,154.7C780,160,840,192,900,208C960,224,1020,224,1080,208C1140,192,1200,160,1260,138.7C1320,117,1380,107,1410,101.3L1440,96L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path>
        </svg>

        <section className="dark-section" id="date">

            <div className="container">
                <div className="text-center">

                    <h1 className="font-esthetic py-3" style={{fontSize: "2rem"}}>Event timmings</h1>
                    <div className="border rounded-pill shadow py-2 px-4 mx-2 mb-4">

                        <div className="row justify-content-center" data-upcoming="2024-04-01 11:00:00" id="wakth">
                            <div className="col-3 p-1">
                                <h2 className="d-inline m-0 p-0" id="day">0</h2><small className="ms-1 me-0 my-0 p-0 d-inline">Day</small>
                            </div>
                            <div className="col-3 p-1">
                                <h2 className="d-inline m-0 p-0" id="hour">0</h2><small className="ms-1 me-0 my-0 p-0 d-inline">hours</small>
                            </div>
                            <div className="col-3 p-1">
                                <h2 className="d-inline m-0 p-0" id="minute">0</h2><small className="ms-1 me-0 my-0 p-0 d-inline">Minute</small>
                            </div>
                            <div className="col-3 p-1">
                                <h2 className="d-inline m-0 p-0" id="second">0</h2><small className="ms-1 me-0 my-0 p-0 d-inline">Second</small>
                            </div>
                        </div>
                    </div>

                    <p style={{fontSize: "0.9rem"}} className="mt-4 py-2">
                        ਵਾਹਿਗੁਰੂ ਜੀ ਦੀ ਕਿਰਪਾ ਅਤੇ ਆਸ਼ੀਰਵਾਦ ਸਦਕਾ ਅਸੀਂ ਹੇਠ ਲਿਖੇ ਸਮਾਗਮ ਕਰਵਾਏ ਹਨ:
                    </p>

                    {/* <!-- Love animation --> */}
                    <div className="position-relative">
                        <div className="position-absolute" style={{ top: "0%", right: "10%"}}>
                            <svg xmlns="https://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="opacity-50 animate-love" viewBox="0 0 16 16">
                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                            </svg>
                        </div>
                    </div>

                    <div className="overflow-x-hidden">
                        <div className="py-2" data-aos="fade-right" data-aos-duration="1500">
                            <h1 className="font-esthetic" style={{fontSize: "2rem"}}>Sagan & Ring Ceremony</h1>
                            <p>Monday 1st April 11:00 AM onwards</p>
                        </div>

                        <div className="py-2" data-aos="fade-left" data-aos-duration="1500">
                            <h1 className="font-esthetic" style={{fontSize: "2rem"}}>Haldi Ceremony</h1>
                            <p>Monday 1st April 3:00 PM onwards</p>
                        </div>

                        <div className="py-2" data-aos="fade-left" data-aos-duration="1500">
                            <h1 className="font-esthetic" style={{fontSize: "2rem"}}>Depature of Barat</h1>
                            <p>Monday 1st April 8:00 PM onwards</p>
                        </div>

                        <div className="py-2" data-aos="fade-left" data-aos-duration="1500">
                            <h1 className="font-esthetic" style={{fontSize: "2rem"}}>Anand Karaj</h1>
                            <p>Monday 2nd April 11:00 AM</p>
                        </div>

                        <div className="py-2" data-aos="fade-left" data-aos-duration="1500">
                            <h1 className="font-esthetic" style={{fontSize: "2rem"}}>Lunch</h1>
                            <p>Monday 2nd April 2:00 PM</p>
                        </div>
                    </div>

                    <div className="py-2" data-aos="fade-up" data-aos-duration="1500">
                        <a href="https://maps.app.goo.gl/S8xZTs8z5is3XCYJ8" target="_blank" className="btn btn-outline-light btn-sm rounded-pill shadow-sm mb-2 px-3">
                            <i className="fa-solid fa-map-location-dot me-2"></i>Google Maps Direction
                        </a>
                        <p>Ekta Palace</p>
                        <p className="mb-0 mt-1 mx-1 pb-4" style={{fontSize: "0.9rem"}}>
                            Ram Katha Marg, Makaniya Purva, Mahoba, Uttar Pradesh 210427, India
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* <!-- Love animation --> */}
        <div className="position-relative">
            <div className="position-absolute" style={{ top: "0%", left: "10%"}}>
                <svg xmlns="https://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="opacity-50 animate-love" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                </svg>
            </div>
        </div>

        {/* <!-- photo gallery --> */}
        <section className="dark-section" id="gallery">

            <div className="container pb-2 pt-4">
                <div className="card-body border rounded-4 shadow p-3">

                    <h1 className="font-esthetic text-center py-3" data-aos="fade-down" data-aos-duration="1500" style={{fontSize: "2rem"}}>Gallery</h1>

                    <div id="carousel-foto-satu" data-aos="fade-up" data-aos-duration="1500" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carousel-foto-satu" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carousel-foto-satu" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carousel-foto-satu" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            <button type="button" data-bs-target="#carousel-foto-satu" data-bs-slide-to="3" aria-label="Slide 4"></button>
                        </div>

                        <div className="carousel-inner rounded-4">
                            <div className="carousel-item active">
                                <img src="./assets/images/DSC09934.jpeg" alt="wedding image 1" className="d-block w-100" />
                            </div>
                            <div className="carousel-item">
                                <img src="./assets/images/DSC09936.jpeg" alt="wedding image 2" className="d-block w-100" />
                            </div>
                            <div className="carousel-item">
                                <img src="./assets/images/DSC09954.jpeg" alt="wedding image 3" className="d-block w-100" />
                            </div>
                            <div className="carousel-item">
                                <img src="./assets/images/DSC00116.jpeg" alt="wedding image 4" className="d-block w-100" />
                            </div>
                        </div>

                        <button className="carousel-control-prev" type="button" data-bs-target="#carousel-foto-satu" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>

                        <button className="carousel-control-next" type="button" data-bs-target="#carousel-foto-satu" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>

                    <div id="carousel-foto-dua" data-aos="fade-up" data-aos-duration="1500" className="carousel slide mt-4" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carousel-foto-dua" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carousel-foto-dua" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carousel-foto-dua" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            <button type="button" data-bs-target="#carousel-foto-dua" data-bs-slide-to="3" aria-label="Slide 3"></button>
                        </div>

                        <div className="carousel-inner rounded-4">
                            <div className="carousel-item active">
                                <img src="./assets/images/DSC09998.jpeg" alt="wedding image 5" className="d-block w-100" />
                            </div>
                            <div className="carousel-item">
                                <img src="./assets/images/DSC09999.jpeg" alt="wedding image 6" className="d-block w-100" />
                            </div>
                            <div className="carousel-item">
                                <img src="./assets/images/DSC00143.jpeg" alt="wedding image 7" className="d-block w-100" />
                            </div>
                            <div className="carousel-item">
                                <img src="./assets/images/DSC00174.jpeg" alt="wedding image 8" className="d-block w-100" />
                            </div>
                        </div>

                        <button className="carousel-control-prev" type="button" data-bs-target="#carousel-foto-dua" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>

                        <button className="carousel-control-next" type="button" data-bs-target="#carousel-foto-dua" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>

        {/* <!-- Wave Separator --> */}
        <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#111111" fillOpacity="1" d="M0,96L30,106.7C60,117,120,139,180,154.7C240,171,300,181,360,186.7C420,192,480,192,540,181.3C600,171,660,149,720,154.7C780,160,840,192,900,208C960,224,1020,224,1080,208C1140,192,1200,160,1260,138.7C1320,117,1380,107,1410,101.3L1440,96L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"></path>
        </svg>


        <section className="m-0 p-0" id="comment">
            <div className="container">

                <div className="card-body border rounded-4 shadow p-3">
                    <h1 className="font-esthetic text-center mb-3" style={{fontSize: "3rem"}}>Blessings & Wishes</h1>
                    <div className="mb-1" id="balasan"></div>

                    <div className="mb-3">
                        <label htmlFor="form-nama" className="form-label">Name</label>
                        <input value={name} onChange={onChangeName} type="text" className="form-control shadow-sm" id="form-nama" placeholder="Enter your name" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="form-kehadiran" className="form-label" id="label-kehadiran">Presence</label>
                        <select onChange={onChangeAttend} className="form-select shadow-sm" id="form-kehadiran">
                            <option value="1" selected>Confirm</option>
                            <option value="0">Tentative</option>
                            {/* <option value="2">Unavailable</option> */}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="form-pesan" className="form-label">Blessing & Wishes</label>
                        {/* <div id="alertDiv" className="alert alert-info alert-dismissible fade show" role="alert">
                            <p style={{fontSize: "1.5rem"}}>Bestieee!!!</p>
                            <p className="m-0">Sekarang bisa format text seperti whatsapp lohh... cobainn sekaranggg, makaciwww bestieee</p>
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick="localStorage.setItem('alertClosed', 'true'); document.getElementById('alertDiv').style.display = 'none';"></button>
                        </div> */}
                        <textarea value={content} onChange={onChangeContent} className="form-control shadow-sm" id="form-pesan" rows="4" placeholder="Write Greetings & Prayers"></textarea>
                    </div>

                    <div className="d-flex">
                        <button className="flex-fill btn btn-danger btn-sm rounded-3 shadow m-1" style={{display: "none"}} onClick={onCancel} id="batal">
                            Cancel<i className="fa-solid fa-xmark ms-1"></i>
                        </button>
                        <button className="flex-fill btn btn-success btn-sm rounded-3 shadow m-1" style={{display: "none"}} onClick={onSendReply} id="balas">
                            Reply<i className="fa-solid fa-reply ms-1"></i>
                        </button>
                        <button className="flex-fill btn btn-warning btn-sm rounded-3 shadow m-1" style={{display: "none"}} onClick="comment.ubah()" id="ubah">
                            Change<i className="fa-solid fa-pen-to-square ms-1"></i>
                        </button>
                        <button className="flex-fill btn btn-primary btn-sm rounded-3 shadow m-1" onClick={submitComment} id="kirim">
                            Send<i className="fa-solid fa-paper-plane ms-1"></i>
                        </button>
                    </div>
                </div>

                <div className="rounded-4 mt-4 mb-2" id="daftar-ucapan">
                    {comments?.map((comment) => renderCard(comment))}
                </div>

                {/* <nav className="d-flex justify-content-center mb-0">
                    <ul className="pagination mb-0">
                        <li className="page-item disabled" id="previous">
                            <button className="page-link" onClick="pagination.previous(this)" aria-label="Sebelumnya">
                                <i className="fa-solid fa-circle-left me-1"></i>Previous
                            </button>
                        </li>
                        <li className="page-item disabled">
                            <span className="page-link text-light" id="page">1</span>
                        </li>
                        <li className="page-item" id="next">
                            <button className="page-link" onClick="pagination.next(this)" aria-label="Selanjutnya">
                                Next<i className="fa-solid fa-circle-right ms-1"></i>
                            </button>
                        </li>
                    </ul>
                </nav> */}
            </div>
        </section>

        {/* <!-- Wave Separator --> */}
        <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#111111" fillOpacity="1" d="M0,224L34.3,234.7C68.6,245,137,267,206,266.7C274.3,267,343,245,411,234.7C480,224,549,224,617,213.3C685.7,203,754,181,823,197.3C891.4,213,960,267,1029,266.7C1097.1,267,1166,213,1234,192C1302.9,171,1371,181,1406,186.7L1440,192L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path>
        </svg>
        </main>
        {/* <!-- Footer --> */}
        <footer>
            <div class="container">
                <div class="text-center">
    
                    <p style={{fontSize: "1.5rem"}} class="pt-2 pb-1 px-2" data-aos="fade-up" data-aos-duration="1500">
                        It would be an honour & happiness for us, if you could come with your family and join us in our wedding celebration.
                    </p>
    
                    <h1 class="font-esthetic" data-aos="fade-up" data-aos-duration="2000"> May the peace, mercy, and blessings of God be with you</h1>
                    <h1 class="font-arabic py-4 px-2" data-aos="fade-up" data-aos-duration="2000" style={{fontSize: "1.5rem"}}>Waheguru Ji Ka Khalsa Waheguru Ji Ki Fateh</h1>
    
                    <hr class="mt-3 mb-2" />
    
                    <div class="row align-items-center justify-content-between flex-column flex-sm-row">
                        <div class="col-auto">
                            <small class="text-light">
                                Build with<i class="fa-solid fa-heart mx-1"></i>Anoop
                            </small>
                        </div>
                        <div class="col-auto">
                            <small>
                                <i class="fa-brands fa-github me-1"></i><a target="_blank" href="https://github.com/codesinghanoop">Github</a>
                                <i class="fa-brands fa-youtube me-1"></i><a target="_blank" href="https://www.youtube.com/watch?v=1WCIrw85zbQ">I Wanna Grow Old with You</a>
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

        {/* <!-- Welcome Page --> */}
    <div class="loading-page" id="welcome" style={{opacity: 1, paddingTop: 99}}>
        <div class="d-flex justify-content-center align-items-center" style={{height: '100vh !important'}}>

            <div class="text-center">
                <h1 class="font-esthetic mb-4" style={{fontSize: '2.5rem'}}>The Wedding Of</h1>

                <div class="img-crop border border-3 border-light shadow mb-4 mx-auto">
                    <img src="./assets/images/couple2.png" alt="bg" />
                </div>

                <h1 class="font-esthetic my-4" style={{fontSize: '2.5rem'}}>Manpreet & Prabhjeet</h1>
                <div id="nama-tamu"></div>

                <button type="button" class="btn btn-light shadow rounded-4 mt-4" onClick={() => util.buka(this)}>
                    <i class="fa-solid fa-envelope-open me-2"></i>Open Invitation
                </button>
            </div>
        </div>
    </div>

        {/* <!-- Audio Button --> */}
    <button type="button" id="tombol-musik" style={{ display: 'none'}} class="btn btn-light btn-sm rounded-circle btn-music" onClick={() => util.music(document.getElementById('tombol-musik'))} data-status="true" data-url="./assets/music/sound.mp3">
        <i class="fa-solid fa-circle-pause spin-button"></i>
    </button>
    </div>
    )
}