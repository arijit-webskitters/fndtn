function bannerTextAnim(bannerSec) {
    let bannerAnimText = bannerSec.querySelector('[data-title-banner]')
    
    // function bannerTextAnimFunction(bannerSec) {
        if (bannerAnimText != undefined) {
            bannerSec.querySelectorAll("[data-title-banner]").forEach((el) => {
                let tr = el,
                    mrk,
                    word,
                    nextBtnWpr;
                nextBtnWpr = el.nextElementSibling;
                Splitting({ target: tr, by: "lines" });
    
                word = tr.querySelectorAll(".word");
                word.forEach((e) => {
                    $(e).wrap(
                        "<span class='title_wrapper' style='overflow: hidden;display:inline-block;'></span>"
                    );
                });
                gsap.set(word, {
                    yPercent: 110,
                    opacity: 0,
                    transformOrigin: "center top",
                    transformStyle: "preserve-3d",
                    display: "inline-block",
                });
    
                let get_start_pos = el.getBoundingClientRect().top;
                let tl = gsap.timeline();
                gsap.set([el], {
                    opacity: 1,
                })
                tl.to(word, {
                    opacity: 1,
                    yPercent: 0,
                    duration: 1.2,
                    stagger: 0.05,
                    onComplete: () => {
                        gsap.to(mrk, {
                            duration: 1,
                            opacity: 1,
                            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
                        });
                    },
                })
                    .to(nextBtnWpr, {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                    });
            });
        }
    // }    
}

function homeBannerAnim(isDekstop, loco_scroll, page_container) {

    let homeBanner = document.getElementById('home-banner');
    if (homeBanner != undefined) {
        let bannerLeftCircle = homeBanner.querySelector('.banner-left-circle'),
            bannerRightCircle = homeBanner.querySelector('.banner-right-circle'),
            bannerVideoCircle = homeBanner.querySelector('.banner-video-wpr'),
            bannerVideoCircleIn = homeBanner.querySelector('.banner-video-wpr-in'),
            bannerVideoPlayCursor = homeBanner.querySelector('.single-cursor-in'),
            bannerBtmPara = homeBanner.querySelector('.banner-btm-para');

        let homeBannerTl = gsap.timeline();
        let homeBannerScrollTl = gsap.timeline();

        gsap.set(bannerLeftCircle, { x: "-30vw", })
        gsap.set(bannerVideoCircle, { x: "-60vw" })
        gsap.set(bannerRightCircle, { x: "-140vw" })
        gsap.set(bannerBtmPara, { opacity: 0 })
        gsap.set(bannerVideoCircleIn, { scale: 1 })
        // gsap.set(bannerVideoPlayCursor, { scale: 0 })


        function bannerScrollAnim() {
            // gsap.set(bannerLeftCircle, { left: '0vw', })
            homeBannerScrollTl.to([bannerLeftCircle, bannerVideoCircle, bannerRightCircle], { top: '-12vw', left: "50vw", ease: 'none' })
                .to([bannerLeftCircle, , bannerRightCircle], { opacity: 0, ease: 'none' })
                .to([bannerVideoCircleIn], { scale: window.innerWidth>1200?4:7, ease: 'none' }, "<")

                // .eventCallback("onUpdate", (e) => {
                // })
                .pause();

            let bannerScrollEnd = ScrollTrigger.create({
                trigger: homeBanner,
                pin: '.banner-btm-cntnt',
                start: 'top 0%',
                end: 'bottom 100%',
                animation: homeBannerScrollTl,
                scrub: 1.3,
                scroller: isDekstop ? page_container : window,
                onUpdate: (e) => {
                    (e.progress > 0.9 ? bannerVideoPlayCursor.classList.add('zoom') : bannerVideoPlayCursor.classList.remove('zoom'))
                }
            })


            $('.scroll-to-sec-btn').on('click', function () {
                if(window.innerWidth>1200){
                    loco_scroll.scrollTo(bannerScrollEnd.end);
                }else{
                    window.scrollTo({
                        top: bannerScrollEnd.end,
                        behavior: 'smooth'
                    });
                }
            })


            // console.log(dd);
            // setTimeout(() => {
            //     console.log(dd.end);                        
            // }, 200);
        }


        // if ($("[data-title]").length) {
        setTimeout(() => {
            bannerTextAnim(homeBanner)
        }, 800);

        homeBannerTl.set([bannerLeftCircle, bannerVideoCircle, bannerRightCircle], { opacity: 1, })
            .to([bannerLeftCircle, bannerVideoCircle, bannerRightCircle], { x: "0vw", duration: 1.2, ease: "power3.out", })
            .to([bannerBtmPara], { opacity: 1, duration: 0.5, delay: 0.8, ease: "none", })
            .eventCallback("onComplete", () => {
                // alert('complete')
                if (isDekstop) {
                    loco_scroll.start();
                }
                bannerScrollAnim()
            });

    }

}


function innerBannerAnim(isDekstop, loco_scroll, page_container) {

    let innerBanner = document.getElementById('inner-banner');
    if (innerBanner != undefined) {
        let bannerLeftCircle = innerBanner.querySelector('.innr-bnnr-lft-crcl'),
            bannerRightCircle = innerBanner.querySelector('.innr-bnnr-rht-crcl'),
            bannerImgCircle = innerBanner.querySelector('.inner-banner-img-wpr'),
            bannerBtmPara = innerBanner.querySelector('.inner-banner-btm-para');

        let innerBannerTl = gsap.timeline();
        let innerBannerScrollTl = gsap.timeline();

        gsap.set(bannerLeftCircle, { x: "-30vw", })
        gsap.set(bannerImgCircle, { x: "-60vw" })
        gsap.set(bannerRightCircle, { x: "-140vw" })
        gsap.set(bannerBtmPara, { opacity: 0 })
        setTimeout(() => {
            bannerTextAnim(innerBanner)
        }, 800);

        innerBannerTl.set([bannerLeftCircle, bannerImgCircle, bannerRightCircle], { opacity: 1, })
            .to([bannerLeftCircle, bannerImgCircle, bannerRightCircle], { x: "0vw", duration: 1.2, ease: "power3.out", })
            .to([bannerBtmPara], { opacity: 1, duration: 0.5, delay: 0.8, ease: "none", })
            .eventCallback("onComplete", () => {
                // alert('complete')
                if (isDekstop) {
                    loco_scroll.start();
                }
            });

    }

}
