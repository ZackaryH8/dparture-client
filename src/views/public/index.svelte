<script>
</script>

<main>
    <div id="main-container">
        <h1>dparture</h1>
        <p>all your departues in one place</p>

        <div class="split">
            <a href="/nationalrail">
                <img src="img/logos/NationalRail.svg" alt="National Rail Logo" />
                <p>National<br />Rail</p>
            </a>
            <a href="/tube">
                <img src="img/logos/Underground.svg" alt="London Underground Logo" />
                <p>London<br />Underground</p>
            </a>
        </div>
    </div>
</main>

<style lang="less">
    @import '../../assets/css/colors.less';
    @import '../../assets/css/tfl.less';

    * {
        color: #fff;
        margin-block-start: 0;
        margin-block-end: 0;
    }

    main {
        height: calc(100% - 40px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    #main-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 450px;
        height: 300px;
        border-radius: 5px;
        background-color: #333333;

        .split {
            width: 100%;
            padding-top: 30px;
            display: flex;
            justify-content: space-evenly;

            a {
                padding: 10px;
                border-radius: 5px;
            }

            a:hover {
                text-decoration: none;
                background-color: #424242;
            }

            img {
                height: 100px;
            }

            p {
                text-align: center;
                margin-top: 5px;
            }
        }
    }

    @media only screen and (max-width: 600px) {
        #main-container {
            width: 95%;
        }
    }
</style>
