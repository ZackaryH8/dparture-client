<script lang="ts">
    import { onMount } from 'svelte';
    import { colors } from '../../assets/data/tflColors';

    let currentTime = new Date().toLocaleTimeString('en-GB');
    let currentNaptan: string = '940GZZLUKSX';
    let currentStation: any[];
    let saveLocation: boolean = false;
    let errorMessage: string = '';

    const groupBy2PropertiesDesc = (arr: any[]) => {
        const mainFilter = 'lineId';
        const secFilter = 'platformName';
        const result = arr.reduce(function (map, obj) {
            let f1 = (map[obj[mainFilter]] = map[obj[mainFilter]] || {});

            if (Object.prototype.toString.call(obj[secFilter]) === '[object Array]') {
                for (let idx in obj[secFilter]) {
                    let f2 = (f1[obj[secFilter][idx]] = f1[obj[secFilter][idx]] || []);
                    f2.push(obj);
                }
            } else {
                let f2 = (f1[obj[secFilter]] = f1[obj[secFilter]] || []);
                f2.push(obj);
            }

            return map;
        }, Object.create(null));

        for (const key of Object.values(result)) {
            const platforms = Object.values(key);
            platforms.forEach((platform) => {
                platform.sort((a, b) => a.timeToStation - b.timeToStation);
            });
        }

        return result;
    };

    const updateTrainServicesByNaptan = async () => {
        if (saveLocation) localStorage.lastLocation = currentNaptan.toUpperCase();
        try {
            const response = await fetch(`http://81.151.25.43:4564/api/v1/tfl/tube/listStationArrivals/${currentNaptan}`);
            const json = await response.json();
            // if (json.httpStatusCode === 404) return (errorMessage = 'Could not fetch data, click <a href="./">here</a> to refresh!');
            currentStation = groupBy2PropertiesDesc(json);
        } catch (e) {
            errorMessage = 'Could not fetch data, click <a href="/">here</a> to refresh!';
        }
    };

    const getLastLocation = () => {
        const _lastLocation: string = localStorage.lastLocation;
        const _saveLocation: string = localStorage.saveLocation;

        if (_lastLocation) currentNaptan = _lastLocation.toUpperCase();
        if (_saveLocation) saveLocation = JSON.parse(_saveLocation.toLowerCase());
    };

    const getMinutesToStation = (seconds: number) => {
        const round = Math.round(seconds / 60);
        if (round === 0) return '      ';
        if (round === 1) return `${round} Min `;
        return `${round} Mins`;
    };

    const getLineColor = (name: string): string => {
        return colors.find((color: any) => color.name === name).hex;
    };

    const setSaveLocation = (e) => {
        localStorage.saveLocation = e.target.checked;
    };

    onMount(() => {
        getLastLocation();
        updateTrainServicesByNaptan();

        const currentTimeInterval = setInterval(() => {
            currentTime = new Date().toLocaleTimeString('en-GB');
        }, 1000);

        const dataInterval = setInterval(() => {
            updateTrainServicesByNaptan();
        }, 65000);

        return () => {
            clearInterval(currentTimeInterval);
            clearInterval(dataInterval);
        };
    });
</script>

<main>
    <h3>{currentTime}</h3>
    <label>
        naptanID Code
        <br />
        <input type="text" style="text-transform: uppercase;" bind:value={currentNaptan} required />
        <input type="button" value="Update" on:click={updateTrainServicesByNaptan} />
    </label>

    {#if errorMessage}
        <h1 id="errmsg">{@html errorMessage}</h1>
    {:else}
        <div class="split-even">
            <input type="checkbox" id="lastlocation" name="lastlocation" bind:checked={saveLocation} on:change={setSaveLocation} />
            <label for="lastlocation">Save last location?</label><br />
        </div>

        {#if currentStation}
            <div class="boards">
                {#each Object.entries(currentStation) as line}
                    <div class="board">
                        <h2 class="line-name capitalize" style="background-color: {getLineColor(line[0]) || ''}">{line[0]}</h2>
                        {#each Object.entries(line[1]) as platform}
                            <div class="board-group">
                                <h4 class="platform-name">{platform[0]}</h4>
                                {#each Object.entries(platform[1].slice(0, 3)) as service}
                                    <div class="split">
                                        <p class="number">{parseInt(service[0]) + 1}</p>
                                        <p class="destination">{service[1].towards}</p>
                                        <p class="eta">{getMinutesToStation(service[1].timeToStation)}</p>
                                    </div>
                                {/each}
                            </div>
                        {/each}
                    </div>
                {/each}
            </div>
        {/if}
    {/if}
</main>

<style lang="less">
    @import '../../assets/css/colors.less';
    @import '../../assets/css/tfl.less';

    main {
        height: calc(100% - 40px);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: max-content;
        width: 100%;
        color: #fff;
        text-align: center;
        padding: 15px 0;
    }

    #errmsg {
        padding: 200px;
    }

    .boards {
        display: flex;
        flex-direction: row;
        justify-content: center;
        // align-items: center;
        text-align: left;
        margin: 0;
        padding: 0;
        flex-wrap: wrap;

        .board {
            width: 400px;
            height: max-content;
            padding: 2px 8px;
            margin: 8px 10px;
            flex: 0 0 25%;

            color: @orange;
            text-shadow: 1px 1px 5px @orange;

            .board-group {
                background-color: @dark-grey !important;
                padding: 2px 8px;
                margin: 8px 0;
            }

            .line-name {
                text-shadow: none;
                // font-family: 'P22 Johnston Underground', serif;
                color: #fff;
                text-align: center;
                padding-top: 2px;
            }

            .platform-name {
                text-shadow: none;
                font-family: 'P22 Johnston Underground', serif;
                color: #fff;
            }

            .split {
                font-family: 'Dot Matrix', serif;
                display: flex;
                margin: 5px 0;
                font-size: larger;
                background-color: #211e0f;
                padding: 1px;
                white-space: pre;

                .number {
                    margin-left: 2px;
                }

                .destination {
                    flex-grow: 1;
                    margin-left: 10px;
                    margin-right: 20px;
                }
            }
        }
    }

    .capitalize {
        text-transform: capitalize;
    }

    * {
        margin-block-start: 0;
        margin-block-end: 0;
        user-select: none;
    }

    @media only screen and (max-width: 600px) {
        .boards {
            flex-direction: column;
        }
    }
</style>
