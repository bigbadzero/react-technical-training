import Home from "../components/home/Home";
import {useNavigate} from 'react-router-dom'
import {useEffect} from 'react';
import {useSelector} from 'react-redux'   ;
import store from "../store/index";
type RootState = ReturnType<typeof store.getState>;

const HomePage = () => {

    return(<Home />)
}

export default HomePage;
