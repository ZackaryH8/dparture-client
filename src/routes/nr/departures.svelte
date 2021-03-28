<script lang="ts">
    import { onMount } from 'svelte';
    import type * as NRData from '../../interfaces/NRData';

    import { host } from '../../assets/data/globals';
    import _naptanIDs from '../../assets/data/naptan';

    let currentTime: string = new Date().toLocaleTimeString('en-GB');
    let errorMessage: string = '';
    let currentStation: NRData.CurrentStation;
    let crs: string = 'KGX';
    let showPlatform: boolean = false;

    async function updateTrainServicesByCRS(crs: string) {
        try {
            const response = await fetch(`https://${host}/api/v1/nr/getDepartureBoardWithDetails/${crs}`);
            const json = await response.json();
            currentStation = json;
            currentStation.trainServices.forEach((service: NRData.TrainService) => {
                service.currentPage = 1;
                service.totalPages = getTotalPages(service.subsequentCallingPoints, 12);

                const lastCp = service.subsequentCallingPoints[service.subsequentCallingPoints.length - 1];
                if (service.subsequentCallingPoints.length <= 1) {
                    lastCp.locationName = `${lastCp.locationName} only.`;
                } else {
                    lastCp.locationName = `& ${lastCp.locationName}.`;
                }
            });
            console.log(currentStation);
        } catch (e) {
            errorMessage = 'Could not fetch data, click <a href="/">here</a> to refresh!';
        }
    }
    function getTotalPages(array: NRData.SubsequentCallingPoint[], pageSize: number): number {
        return Math.ceil(array.length / pageSize);
    }
    function paginate(array: NRData.SubsequentCallingPoint[], pageSize: number, pageNumber: number) {
        return array.slice(pageSize * (pageNumber - 1), pageSize * pageNumber);
    }

    function getOperatorName(opName: string): string {
        if (opName === 'East Midlands Railway') return 'EMR';
        if (opName === 'London North Eastern Railway') return 'LNER';
        if (opName === 'South Western Railway') return 'SWR';
        return opName;
    }

    onMount(() => {
        updateTrainServicesByCRS(crs);
        /* Update clock time*/
        const currentTimeInterval = setInterval(() => {
            currentTime = new Date().toLocaleTimeString('en-GB');
        }, 1000);

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
            clearInterval(currentTimeInterval);
            clearInterval(pageInterval);
        };
    });
</script>

<main>
    <div id="nr">
        <h3>{currentTime}</h3>
        <br />
        <div class="split-even">
            <input type="text" placeholder="PBO" bind:value={crs} maxlength="3" />
            <button on:click={() => updateTrainServicesByCRS(crs)}>Update</button>
        </div>

        {#if currentStation?.trainServices?.length >= 1}
            <div class="boards">
                {#each currentStation.trainServices as service}
                    <div class="board">
                        <div class="split">
                            <p class="time">{service.std}</p>
                            <p class="platform">{showPlatform ? `Platform ${service.platform || 'TBC'}` : service.etd}</p>
                        </div>

                        <p class="destination">{service.destination.name}</p>
                        <br />
                        <p class="callingAt">
                            Calling at: <span class="right-align">Page {service.currentPage} of {service.totalPages}</span>
                        </p>
                        <div class="callingPoints">
                            {#each paginate(service.subsequentCallingPoints, 12, service.currentPage) as cp}
                                <p>
                                    {cp.locationName}
                                </p>
                            {/each}
                        </div>

                        <p class="toc bottom-align">{getOperatorName(service.operator)}</p>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</main>

<style lang="less">
    @import '../../assets/css/colors.less';
    @import '../../assets/css/tfl.less';

    #nr {
        height: calc(100% - 40px);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        // height: max-content;
        width: 100%;
        text-align: center;
        padding: 15px 0;

        label,
        h3 {
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

    .board {
        display: flex;
        flex-direction: column;
        margin: 5px;
        padding: 5px 15px;
        background-color: @dark-grey !important;
        color: @orange;
        text-shadow: 1px 1px 5px @orange;

        width: 220px;
        height: 450px;
        text-align: left;
        vertical-align: center;

        .split {
            display: flex;
            justify-content: space-between;
            margin: 10px 0;
            font-size: larger;
            background-color: #211e0f;
            padding: 1px;
        }

        .destination {
            font-size: large;
            background-color: #211e0f;
            margin: 5px 0;
            padding: 1px;
        }

        .callingAt {
            background-color: #211e0f;
            margin: 5px 0;
            padding: 1px;
        }
        .callingPoints {
            margin-top: 2px;

            p {
                background-color: #211e0f;
                margin: 5px 0;
                padding: 1px;
            }
        }
        .toc {
            background-color: #211e0f;
            padding: 1px;
            margin-bottom: 10px;
            font-size: larger;
        }
    }

    .bottom-align {
        margin-top: auto;
    }
    .right-align {
        float: right;
    }

    @media only screen and (max-width: 600px) {
        .boards {
            height: 530px;
            display: flex;
            overflow-x: auto;
            flex-wrap: initial;
            justify-content: initial;
        }

        .board {
            flex-shrink: 0;
            height: initial;
        }
    }
</style>
