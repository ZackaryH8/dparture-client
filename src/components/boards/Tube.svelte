{#if line}
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
{/if}

<script lang="ts">
    import type { Service } from '../../interfaces/listStationArrivals';

    import { getLineBGColor, getLineTextColor } from '../../helpers/color';
    import getMinutesToStation from '../../helpers/getMinutesToStation';

    export let line: [string, Record<string, Service[]>] = undefined;
</script>

<style lang="less">
    @import '../../assets/css/colors.less';
    @import '../../assets/css/tfl.less';
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

    .capitalize {
        text-transform: capitalize;
    }
</style>
