<script lang="ts">
    import { onMount } from 'svelte';
    import Select from 'svelte-select';
    import { host } from '../../assets/data/globals';
    import { getLineBGColor, getLineTextColor } from '../../helpers/color';

    import _naptanIDs from '../../assets/data/naptan';
    let naptanIDs = _naptanIDs;

    let currentTime = new Date().toLocaleTimeString('en-GB');
    let _currentNaptan = undefined;
    let currentNaptan: string = '940GZZLUKSX';
    let currentStation: any[];
    let saveLocation: boolean = false;
    let errorMessage: string = '';

    /* Uhh... it works?*/
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

    /* Fetch new data */
    const updateTrainServicesByNaptan = async (CurrentNaptan: string) => {
        try {
            const response = await fetch(`http://${host}:4564/api/v1/tfl/tube/listStationArrivals/${CurrentNaptan}`);
            const json = await response.json();
            currentStation = groupBy2PropertiesDesc(json);
        } catch (e) {
            errorMessage = 'Could not fetch data, click <a href="/">here</a> to refresh!';
        }
    };

    /* Round timeToStation property (seconds) to minutes */
    const getMinutesToStation = (seconds: number) => {
        const round = Math.round(seconds / 60);
        if (round === 0) return '      ';
        if (round === 1) return `${round} Min `;
        return `${round} Mins`;
    };

    const setSaveLocation = (e) => {
        localStorage.saveLocation = e.target.checked;
    };

    const getLastSession = () => {
        const _saveLocation: string = localStorage.saveLocation;
        let _lastLocation: any = localStorage.lastLocation;
        if (_saveLocation) saveLocation = JSON.parse(_saveLocation.toLowerCase());
        if (_lastLocation) {
            _lastLocation = JSON.parse(_lastLocation);
            currentNaptan = _lastLocation.value;
            _currentNaptan = _lastLocation;
        }
    };

    function handleSelect(event: any) {
        currentNaptan = event.detail.value;
        if (saveLocation) localStorage.lastLocation = JSON.stringify(event.detail);
        updateTrainServicesByNaptan(currentNaptan);
    }

    onMount(() => {
        getLastSession();
        updateTrainServicesByNaptan(currentNaptan);

        /* Update clock time*/
        const currentTimeInterval = setInterval(() => {
            currentTime = new Date().toLocaleTimeString('en-GB');
        }, 1000);

        /* Update the train services */
        const dataInterval = setInterval(() => {
            updateTrainServicesByNaptan(currentNaptan);
        }, 65000);

        return () => {
            clearInterval(currentTimeInterval);
            clearInterval(dataInterval);
        };
    });
</script>

<main>
    <div id="tube">
        <h3>{currentTime}</h3>

        <div class="select">
            <Select items={naptanIDs} bind:selectedValue={_currentNaptan} on:select={handleSelect} isClearable={false} showIndicator={true} placeholder="Kings's Cross St. Pancras" />
        </div>

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
                            <!-- Split and Join to fix the name of the waterloo and city line -->
                            <div class="line-name capitalize" style="color:{getLineTextColor(line[0] || '')}; background-color: {getLineBGColor(line[0] || '')}">
                                <h2>{line[0].split('-').join(' & ')}</h2>
                            </div>
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
    </div>
</main>

<style lang="less">
    @import '../../assets/css/colors.less';
    @import '../../assets/css/tfl.less';

    #tube {
        height: calc(100% - 40px);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: max-content;
        width: 100%;
        text-align: center;
        padding: 15px 0;

        label,
        h3 {
            color: #fff;
        }
    }

    #errmsg {
        padding: 200px;
        color: #fff;
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
            height: max-content;
            padding: 2px 8px;
            margin: 8px 10px;
            flex: 0 0 25%;
            min-width: 400px;

            color: @orange;
            text-shadow: 1px 1px 5px @orange;

            .board-group {
                background-color: @dark-grey !important;
                padding: 2px 8px;
                margin: 8px 0;
            }

            .line-name {
                text-shadow: none;
                color: #fff;
                text-align: center;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 26px;
                padding-bottom: 2px;
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

    .split-even {
        padding-bottom: 10px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        input {
            margin-right: 10px;
        }
    }

    .select {
        min-width: 250px;
        margin: 10px;
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
            width: 100%;

            .board {
                min-width: 95%;
                padding: 0;
            }
        }
    }
</style>
