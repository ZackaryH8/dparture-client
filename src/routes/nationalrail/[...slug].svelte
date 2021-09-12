<script context="module" lang="ts">
    function getTotalPages(array: NRData.SubsequentCallingPoint[], pageSize: number): number {
        return Math.ceil(array.length / pageSize);
    }

    export async function preload({ params }) {
        const res = await this.fetch(`nationalrail/${params.slug}.json`);
        const data: NRData.CurrentStation = await res.json();

        data?.trainServices?.forEach((service: NRData.TrainService) => {
            service.currentPage = 1;
            service.totalPages = getTotalPages(service.subsequentCallingPoints, 12);

            service.showPlatform = false;

            // service.subsequentCallingPoints.forEach(function(cp, index) {
            //     if(cp.et === "Cancelled") {
            //         service.subsequentCallingPoints.splice(index, 1);
            //
            //         console.log(service.subsequentCallingPoints)
            //     }
            // })

            const lastCp = service?.subsequentCallingPoints[service.subsequentCallingPoints.length - 1];

            if (service.subsequentCallingPoints.length <= 1) {
                lastCp.locationName = `${lastCp.locationName} only.`;
            } else {
                lastCp.locationName = `& ${lastCp.locationName}.`;
            }
        });

        if (res.status === 200) {
            return { data, params };
        } else {
            this.error(res.status, 'There was an error');
        }
    }
</script>

<script lang="ts">
    import { onMount } from 'svelte';

    import type * as NRData from '../../interfaces/NRData';
    import NationalRail from '../../components/boards/NationalRail.svelte';

    export let data, params;

    let currentStation: NRData.CurrentStation = data;
    let showPlatform: boolean = false;
    let showCPTimes: boolean = false;

    onMount(() => {
        // if(urlCRS) crs = urlCRS.crs.toUpperCase()
        const dataInterval = setInterval(() => {
            // updateTrainServicesByCRS(crs);
        }, 60000);

        const pageInterval = setInterval(() => {
            currentStation?.trainServices?.forEach((service: NRData.TrainService) => {
                if (service.etd == 'Cancelled') {
                    service.showPlatform = false;
                } else {
                    service.showPlatform = !service.showPlatform;
                }

                if (service.currentPage !== service.totalPages) {
                    service.currentPage++;
                } else {
                    service.currentPage = 1;
                }

                currentStation = currentStation;
            });
        }, 5000);

        /* Update the train services */
        return () => {
            clearInterval(dataInterval);
            clearInterval(pageInterval);
        };
    });
</script>

<svelte:head>
    <title>{params.slug[0]} - {params.slug[1]}</title>
</svelte:head>

<div id="nr">
    {#if currentStation?.trainServices?.length >= 1}
        <div class="boards">
            {#each currentStation.trainServices as service}
                <NationalRail bind:service bind:showCPTimes bind:showPlatform />
            {/each}
        </div>
    {/if}
</div>

<style lang="less">
    @import '/static/fonts/DotMatrix/font.css';

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
        height: inherit;
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
            -ms-scroll-snap-type: x mandatory;
            scroll-snap-type: x mandatory;
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
        }
    }
</style>
