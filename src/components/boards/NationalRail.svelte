{#if service}
    <div class="board">
        <div class="split">
            <p class="time">{service.std}</p>
            <p class="platform">{service.showPlatform ? `Platform ${service.platform || 'TBC'}` : service.etd}</p>
        </div>

        <p class="destination">{service.destination.name.replace(' Kings', " King's")}</p>
        <br />
        <p class="callingAt">
            Calling at: <span class="right-align">Page {service.currentPage} of {service.totalPages}</span>
        </p>
        <div class="callingPoints">
            {#each paginate(service.subsequentCallingPoints, 12, service.currentPage) as cp}
                <!--{#if cp.et !== "Cancelled"}-->

                <p>
                    {cp.locationName.replace(' Kings', " King's")}
                    {#if showCPTimes}
                        ({cp.st})
                    {/if}
                </p>
                <!--{/if}-->
            {/each}
        </div>

        <p class="toc bottom-align">{getOperatorName(service.operator)}</p>
    </div>
{/if}

<script lang="ts">
    import { paginate } from '../../helpers/paginate';
    import { getOperatorName } from '../../helpers/operatorCode';
    import type * as NRData from '../../interfaces/NRData';

    export let service: NRData.TrainService | undefined = undefined;
    export let showPlatform: boolean = false;
    export let showCPTimes: boolean = false;
</script>

<style lang="less">
    @import '/static/css/colors.less';
    @import '/static/css/tfl.less';

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
        .board {
            width: 90%;
            flex-shrink: 0;
            height: 95%;
            // margin: 0;
            scroll-snap-align: start;
        }
    }
</style>
