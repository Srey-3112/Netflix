import React, { useEffect,useState } from "react";
import "./Home.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import {BiPlay} from 'react-icons/bi'
import {AiOutlinePlus} from 'react-icons/ai'

const apiKey= "5d82153f844b4e86d29e6e0c9e503040";
const url="https://api.themoviedb.org/3";
const upcoming="upcoming";
const nowPlaying="now_playing";
const popular="popular";
const topRated="top_rated";
const imgUrl="https://image.tmdb.org/t/p/original";


const Card = ({ img }) => {
  return (
    <img src={img} alt="cover" className="card" />
  );
};

const Row = ({ title, movieArr=[] }) => {
  return (
    <div className="row">
      <h2>{title}</h2>
      <div>
        {
            movieArr.map((item,index)=>(
                <Card key={index} img={`${imgUrl}/${item.poster_path}`}/>
            ))
        }
      
      </div>
    </div>
  );
};

const Home = () => {
  
    const [upcomingMovies, setUpcomingMovies] = useState([])
    const [nowPlayingMovies, setnowPlayingMovies] = useState([])
    const [popularMovies, setpopularMovies] = useState([])
    const [topRatedMovies, settopRatedMovies] = useState([])
    const [genre, setgenre] = useState([])
    useEffect(()=>{
            const fetchUpcoming= async ()=>{
                const {data:{results}}=await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}&page=8`);
                setUpcomingMovies(results);
            };
            const fetchPopular= async ()=>{
                const {data:{results}}= await axios.get(`${url}/movie/${popular}?api_key=${apiKey}&page=2`)
                setpopularMovies(results);
            };
            const fetchTopRated= async ()=>{
                const {data:{results}}= await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}&page=2`)
                settopRatedMovies(results);
            };
            const fetchNowPlaying= async ()=>{
                const {data:{results}}= await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}&page=6`)
                setnowPlayingMovies(results);
            };
            const fetchAllGenre = async ()=>{
                const {
                    data: { genres },
                } = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`);
                setgenre(genres);
                
            }

            fetchUpcoming();
            fetchPopular();
            fetchNowPlaying();
            fetchTopRated();
            fetchAllGenre();
    },[])
  
  
    return ( 
    <div>
      <section className="home">
        <div className="banner" style={{backgroundImage:popularMovies[0]? `url(${`${imgUrl}/${popularMovies[0].poster_path}`})`: "rgb(16,16,16)"}}>
                {popularMovies[0] && <h1>{popularMovies[0].original_title}</h1>}
                {popularMovies[0] && <p>{popularMovies[0].overview}</p>}

                <div>
                    <button><BiPlay/>Play</button>
                    <button>My List<AiOutlinePlus/></button>
                </div>
        </div>
        <Row title={"Upcoming Movies"} movieArr={upcomingMovies}/>
        <Row title={"Now Playing"} movieArr={nowPlayingMovies}/>
        <Row title={"Top Rated Movies"} movieArr={topRatedMovies}/>
        <Row title={"Popular"} movieArr={popularMovies}/>
        <div className="genreBox">


        {
            genre.map((item) => (
                        <Link key={item.id} to={`/genre/${item.id}`}>
                            {item.name}
                        </Link>
                    ))
        }
        </div>
      </section>
    </div>
  );
};

export default Home;
