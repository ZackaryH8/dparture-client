<main>
    <div id="tube">
        <Clock />

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
                        <Tube bind:line />
                    {/each}
                </div>
            {/if}
        {/if}
    </div>
</main>

<script lang="ts">
    import { onMount } from 'svelte';
    import Select from 'svelte-select';

    import Clock from '../../components/common/clock.svelte';
    import Tube from '../../components/boards/Tube.svelte';

    import { host } from '../../assets/data/globals';
    import _naptanIDs from '../../assets/data/naptan';

    import { groupBy2PropertiesDesc } from '../../helpers/group';

    import type naptanID from '../../interfaces/naptanID';
    import type IlistStationArrivals from '../../interfaces/listStationArrivals';

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

        /* Update the train services */
        const dataInterval = setInterval(() => {
            updateTrainServicesByNaptan(currentNaptan.value);
        }, 65000);

        return () => {
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

        .select {
            min-width: 250px;
            margin: 10px;
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

    * {
        margin-block-start: 0;
        margin-block-end: 0;
        user-select: none;
    }

    @media only screen and (max-width: 600px) {
        .boards {
            flex-direction: column;
            width: 100%;
        }
    }
</style>
