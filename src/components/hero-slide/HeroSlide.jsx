import React, { useEffect, useState } from 'react'
import SwiperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react';
import Button, { OutlineButton } from '../button/Button'
import Modal, { ModalContent } from '../modal/Modal'
import tmdbApi, { category, movieType } from '../../api/tmdbApi'
import apiConfig from '../../api/apiConfig'
import './hero-slide.scss'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useRef } from 'react/cjs/react.production.min';

const HeroSlide = () => {

    SwiperCore.use([Autoplay])

    const [movieItems, setMovieItems] = useState([])

    useEffect(() => {
        const getMovies = async () => {
            const params = { page: 1 }
            try {
                const response = await tmdbApi.getMovieList(movieType.popular, { params })
                setMovieItems(response.results.slice(0, 10))
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        }
        getMovies()
    }, [])

    return (
        <div className='hero-slide'>
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
            // autoplay={{ delay: 2000 }}
            >
                {
                    movieItems.map((item, i) => {
                        return <SwiperSlide key={i}>
                            {({ isActive }) => (
                                <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`} />
                            )}
                        </SwiperSlide>
                    })
                }
            </Swiper>
            {/* {
                movieItems.map((item, i) => <TrailerModal key={i} item={item} />)
            } */}
        </div>
    )
}

const HeroSlideItem = props => {
    let history = useHistory()
    const item = props.item
    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path)

    return (
        <div
            className={`hero-slide__item ${props.className}`}
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="hero-slide__item__content container">
                <div className="hero-slide__item__content__info">
                    <h2 className="title">{item.title}</h2>
                    <div className="overview">{item.overview}</div>
                    <div className="btns">
                        <Button onClick={() => history.push('/movie/' + item.id)}>
                            Watch now
                        </Button>
                        <OutlineButton onClick={() => console.log('trailer')}>
                            Watch trailer
                        </OutlineButton>
                    </div>
                </div>
                <div className="hero-slide__item__content__poster">
                    <img src={apiConfig.w500Image(item.poster_path)} alt="item" />
                </div>
            </div>
        </div>
    )
}

const TrailerModal = props => {
    const item = props.item
    const iframeRef = useRef(null)
    const onClose = () => iframeRef.current.setAttribute('src', '')
    return (
        <Modal active={false} id={`modal_${item.id}`}>
            <ModalContent onClose={onClose}>
                <iframe ref={iframeRef} width="100%" height="500px" title='trailer'></iframe>
            </ModalContent>
        </Modal >
    )
}

export default HeroSlide