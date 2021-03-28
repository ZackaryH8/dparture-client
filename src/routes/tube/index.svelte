<script lang="ts">
</script>

<main>
    <div id="main-container">
        <h1>dparture</h1>
        <p>all your departues in one place</p>
        <div class="split">
            <a class="button" href="#/tube/departures">
                <img src="https://via.placeholder.com/150" alt="National Rail Logo" draggable="false" />
                <p>Departures</p>
            </a>
            <a class="button" href="#/tube/status">
                <img src="https://via.placeholder.com/150" alt="London Underground Logo" draggable="false" />
                <p>Line Status</p>
            </a>
        </div>
        <div
            class="button"
            on:click={() => {
                window.history.back();
            }}
        >
            Go Back
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

            img {
                height: 100px;
            }

            p {
                text-align: center;
                margin-top: 5px;
            }
        }
    }

    .button {
        padding: 10px;
        border-radius: 5px;
        text-decoration: none;
        cursor: pointer;
    }

    .button:hover {
        text-decoration: none;
        background-color: #424242;
    }

    @media only screen and (max-width: 600px) {
        #main-container {
            width: 95%;
        }
    }
</style>
