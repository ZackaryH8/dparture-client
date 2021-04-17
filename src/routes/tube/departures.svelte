<SvelteSeo
    title="dparture - Tube"
    description="Live departures from all London Underground Stations"
    openGraph="{{
        title: 'dparture - Tube',
        description: 'Live departures from all London Underground Stations',
        url: 'https://dparture.cc/#/tube/departures',
        type: 'website',
        images: [
            {
                url: 'https://81.151.25.43:5000/img/logos/dparture.png',
                width: 850,
                height: 650,
                alt: 'Og Image Alt',
            },
        ],
    }}" />

<main>
    <div id="tube">
        <h3>{currentTime}</h3>

        <div class="select">
            <Select items="{naptanIDs}" bind:selectedValue="{currentNaptan}" on:select="{handleStationSelect}" isClearable="{false}" showIndicator="{true}" placeholder="Kings's Cross St. Pancras" />
        </div>

        {#if errorMessage}
            <h1 id="errmsg">{@html errorMessage}</h1>
        {:else}
            <div class="split-even">
                <input
                    type="checkbox"
                    id="lastlocation"
                    name="lastlocation"
                    bind:checked="{saveLocation}"
                    on:change="{() => {
                        handleSaveLocationToggled;
                    }}" />
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

<script lang="ts">
import { onMount } from 'svelte';
import SvelteSeo from 'svelte-seo';
import Select from 'svelte-select';

import { host } from '../../assets/data/globals';
import _naptanIDs from '../../assets/data/naptan';

import { getLineBGColor, getLineTextColor } from '../../helpers/color';
import { groupBy2PropertiesDesc } from '../../helpers/group';

import type naptanID from '../../interfaces/naptanID';
import type IlistStationArrivals from '../../interfaces/listStationArrivals';

let currentTime: string = new Date().toLocaleTimeString('en-GB');
let currentNaptan: naptanID = { value: '940GZZLUKSX', label: "King's Cross St. Pancras" };
let currentStation: IlistStationArrivals;
let saveLocation: boolean = false;
let naptanIDs: naptanID[] = _naptanIDs;
let errorMessage: string = '';

/* Fetch new data */
async function updateTrainServicesByNaptan(CurrentNaptan: string) {
    try {
        const response = await fetch(`https://${host}/api/v1/tfl/tube/listStationArrivals/${CurrentNaptan}`);
        const json = await response.json();
        currentStation = groupBy2PropertiesDesc(json);
    } catch (e) {
        errorMessage = 'Could not fetch data, click <a href="/">here</a> to refresh!';
    }
}

/* Round timeToStation property (seconds) to minutes */
function getMinutesToStation(seconds: number) {
    const round = Math.round(seconds / 60);
    if (round === 0) return '      ';
    if (round === 1) return `${round} Min `;
    return `${round} Mins`;
}

function getLocalStorageState() {
    const _saveLocation: string = localStorage.saveLocation;
    let _lastLocation: string = localStorage.lastLocation;

    if (_saveLocation) saveLocation = JSON.parse(_saveLocation.toLowerCase());
    if (_lastLocation) currentNaptan = JSON.parse(_lastLocation);
}

function handleStationSelect() {
    if (saveLocation) localStorage.lastLocation = JSON.stringify(currentNaptan);
    updateTrainServicesByNaptan(currentNaptan.value);
}

function handleSaveLocationToggled(e: { target: { checked: boolean } }) {
    const bool: boolean = e.target.checked;
    localStorage.saveLocation = bool;
    if (bool) localStorage.lastLocation = JSON.stringify(currentNaptan);
}

onMount(() => {
    getLocalStorageState();
    updateTrainServicesByNaptan(currentNaptan.value);

    /* Update clock time*/
    const currentTimeInterval = setInterval(() => {
        currentTime = new Date().toLocaleTimeString('en-GB');
    }, 1000);

    /* Update the train services */
    const dataInterval = setInterval(() => {
        updateTrainServicesByNaptan(currentNaptan.value);
    }, 65000);

    return () => {
        clearInterval(currentTimeInterval);
        clearInterval(dataInterval);
    };
});
</script>

<style lang="less">
@import '../../assets/css/colors.less';
@import '../../assets/css/tfl.less';

#tube {
    height: calc(100% - 40px);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    text-align: center;
    padding: 15px 0;

    h3 {
        color: #fff;
    }

    label[for='lastlocation'] {
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
