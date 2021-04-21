<td style="background-color: {getLineBGColor(line.id || '')}">
    <h4 style="color: {getLineTextColor(line.id || '')};">{line.name}</h4>
</td>
<td class="distruption" style="background: linear-gradient(90deg, #424242 96%, {getDistruptionColor(line.lineStatuses[0].statusSeverityDescription)} 0);">
    {line.lineStatuses[0].statusSeverityDescription}
</td>

<script>
    import { getLineBGColor, getLineTextColor, getDistruptionColor } from '../../helpers/color';

    export let line = null;
</script>
