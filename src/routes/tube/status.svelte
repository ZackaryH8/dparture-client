<script lang="ts">
    import { onMount } from 'svelte';
    import { host } from '../../assets/data/globals';
    import { getLineBGColor, getLineTextColor } from '../../helpers/color';

    let statuses: any = undefined;
    let errorMessage: string = '';

    async function getAllLineStatuses() {
        try {
            let data: any = await fetch(`http://${host}:4564/api/v1/tfl/tube/getAllLineStatuses`);
            statuses = await data.json();
        } catch (e) {
            errorMessage = 'Could not fetch data, click <a href="/">here</a> to refresh!';
        }
    }

    function getDistruptionColor(str: string = '') {
        if (str === 'Good Service') return '#47b300';
        if (str === 'Minor Delays') return '#ffae00';
        if (str === 'Reduced Service' || str === 'Part Suspended') return '#db6300';
        if (str === 'Planned Closure' || str === 'Severe Delays' || str === 'Part Closure' || str === 'Service Closed') return '#db2c00';
        return '#424242';
    }

    onMount(() => {
        getAllLineStatuses();

        /* Update the status data */
        const dataInterval = setInterval(() => {
            getAllLineStatuses();
        }, 300000);

        return () => {
            clearInterval(dataInterval);
        };
    });
</script>

<main>
    <div id="status">
        {#if statuses}
            <table>
                {#each statuses as line}
                    <tr>
                        <td style="color:{getLineTextColor(line.id || '')}; background-color: {getLineBGColor(line.id || '')}">
                            <h4>{line.name}</h4>
                        </td>
                        <td class="distruption" style="background: linear-gradient(90deg, #424242 96%, {getDistruptionColor(line.lineStatuses[0].statusSeverityDescription)} 0);">
                            {line.lineStatuses[0].statusSeverityDescription}
                        </td>
                    </tr>
                {/each}
            </table>
        {/if}
    </div>
</main>

<style lang="less">
    @import '../../assets/css/colors.less';
    @import '../../assets/css/tfl.less';
    #status {
        height: calc(100vh - 70px);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        text-align: center;
        padding: 15px 0;

        * {
            color: #fff;
        }
    }

    table {
        width: 30%;
        tr {
            height: 40px;

            td {
                background-color: #424242;
            }
        }
    }

    @media only screen and (max-width: 600px) {
        #status {
            height: calc(100% - 40px);
        }
        table {
            width: 90%;
        }
    }
</style>
