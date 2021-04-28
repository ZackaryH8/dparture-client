<main>
    <div id="nr">
        <Clock/>
        <br />
        <div class="split-even">
            <label>
                <input
                    type="text"
                    placeholder="PBO"
                    bind:value="{crs}"
                    maxlength="3"
                    on:keypress="{(e) => {
                        if (e.code === 'Enter') updateTrainServicesByCRS(crs);
                    }}" />
            </label>
            <button on:click="{() => updateTrainServicesByCRS(crs)}">Update</button>
        </div>

        <div class="split-even">
            <input type="checkbox" id="showCP" name="showCP" bind:checked="{showCPTimes}" />
            <label for="showCP">Calling Point Times?</label><br />
        </div>

        <div class="split-even">
            <input type="checkbox" id="lastlocation" name="lastlocation" />
            <label for="lastlocation">Save last location?</label><br />
        </div>

        {#if currentStation?.trainServices?.length >= 1}
            <div class="boards">
                {#each currentStation.trainServices as service}
                    <NationalRail bind:service bind:showCPTimes bind:showPlatform />
                {/each}
            </div>
        {/if}
    </div>
</main>

<script lang="ts">
    import { onMount } from 'svelte';
    import qs from 'query-string';
    import { querystring } from 'svelte-spa-router';
    import type * as NRData from '../../interfaces/NRData';

    import { host } from '../../assets/data/globals';

    let errorMessage: string = '';
    let currentStation: NRData.CurrentStation;
    let lastCrs: string = '';
    $: crs = parse($querystring).crs?.toUpperCase() || 'PBO';
    $: if (crs && crs.length === 3) {
        updateTrainServicesByCRS(crs);
    }

    let showPlatform: boolean = false;
    let showCPTimes: boolean = false;

    async function updateTrainServicesByCRS(crs: string) {
        if (crs !== lastCrs) {
            lastCrs = crs;
            try {
                const response = await fetch(`https://${host}/api/v1/nr/getDepartureBoardWithDetails/${crs}`);
                currentStation = await response.json();
                currentStation?.trainServices?.forEach((service: NRData.TrainService) => {
                    service.currentPage = 1;
                    service.totalPages = getTotalPages(service.subsequentCallingPoints, 12);

                    const lastCp = service?.subsequentCallingPoints[service.subsequentCallingPoints.length - 1];
                    if (service.subsequentCallingPoints.length <= 1) {
                        lastCp.locationName = `${lastCp.locationName} only.`;
                    } else {
                        lastCp.locationName = `& ${lastCp.locationName}.`;
                    }
                });
            } catch (e) {
                errorMessage = 'Could not fetch data, click <a href="/">here</a> to refresh!';
            }
        }
    }

    function getTotalPages(array: NRData.SubsequentCallingPoint[], pageSize: number): number {
        return Math.ceil(array.length / pageSize);
    }

    onMount(() => {
        // if(urlCRS) crs = urlCRS.crs.toUpperCase()
        const dataInterval = setInterval(() => {
            updateTrainServicesByCRS(crs);
        }, 60000);

        const pageInterval = setInterval(() => {
            showPlatform = !showPlatform;
            currentStation?.trainServices?.forEach((service: NRData.TrainService) => {
                if (service.currentPage !== service.totalPages) {
                    service.currentPage++;
                    currentStation = currentStation;
                } else {
                    service.currentPage = 1;
                    currentStation = currentStation;
                }
            });
        }, 5000);

        /* Update the train services */
        return () => {
            clearInterval(dataInterval);
            clearInterval(pageInterval);
        };
    });

    import NationalRail from '../../components/boards/NationalRail.svelte';
    import Clock from '../../components/common/clock.svelte';
</script>

<style lang="less">
    @import '../../assets/css/colors.less';
    @import '../../assets/css/tfl.less';

    #nr {
        height: calc(100% - 40px);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        text-align: center;
        label {
            color: #fff;
        }
    }

    .boards {
        font-family: 'Dot Matrix', serif;
        margin: 10px auto;
        width: 80%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        text-align: left;
        user-select: none;
        vertical-align: center;

        &::-webkit-scrollbar {
            width: 10px;
            height: 8px;
        }
        &::-webkit-scrollbar-thumb {
            background: #4a4a4a;
            border-radius: 3px;
        }
        &::-webkit-scrollbar-track {
            background: transparent;
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

    @media only screen and (max-width: 600px) {
        .boards {
            width: 300px;
            height: 530px;
            display: flex;
            overflow-x: auto;
            justify-content: initial;
            flex-wrap: initial;
            scroll-snap-type: x mandatory;
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
        }
    }
</style>
