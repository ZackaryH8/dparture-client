<script lang="ts">
    let showTubeChild: boolean = false;
    let showNRChild: boolean = false;
</script>

<main>
    <div id="main-container">
        <h1>dparture</h1>
        <p>all your departues in one place</p>

        {#if !showTubeChild && !showNRChild}
            <div class="split">
                <div
                    class="button"
                    on:click={() => {
                        showTubeChild = false;
                        showNRChild = true;
                    }}
                >
                    <img src="img/logos/NationalRail.svg" alt="National Rail Logo" />
                    <p>National<br />Rail</p>
                </div>
                <div
                    class="button"
                    on:click={() => {
                        showTubeChild = true;
                        showNRChild = false;
                    }}
                >
                    <img src="img/logos/Underground.svg" alt="London Underground Logo" />
                    <p>London<br />Underground</p>
                </div>
            </div>
        {:else if showTubeChild}
            <div class="split">
                <a class="button" href="#/tube/departures">
                    <img src="https://via.placeholder.com/150" alt="National Rail Logo" />
                    <p>Departures</p>
                </a>
                <a class="button" href="#/tube/status">
                    <img src="https://via.placeholder.com/150" alt="London Underground Logo" />
                    <p>Line Status</p>
                </a>
            </div>
            <div
                class="button"
                on:click={() => {
                    showTubeChild = false;
                    showNRChild = false;
                }}
            >
                Go Back
            </div>
        {:else if showNRChild}
            <div class="split">
                <a class="button" href="#/nationalrail">
                    <img src="https://via.placeholder.com/150" alt="National Rail Logo" />
                    <p>Departures</p>
                </a>
                <a class="button" href="#/tube/departures">
                    <img src="https://via.placeholder.com/150" alt="London Underground Logo" />
                    <p>Line Status</p>
                </a>
            </div>
            <div
                class="button"
                on:click={() => {
                    showTubeChild = false;
                    showNRChild = false;
                }}
            >
                Go Back
            </div>
        {/if}
    </div>
</main>

<style lang="less">
    @import '../assets/css/colors.less';
    @import '../assets/css/tfl.less';

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
