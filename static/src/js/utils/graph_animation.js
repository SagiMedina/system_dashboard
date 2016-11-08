let seq = 0, delays = 80, durations = 500;
let seq2 = 0, delays2 = 80, durations2 = 500;

export function startAnimationForLineChart(chart){

    chart.on('draw', (data) => {
        if(data.type === 'line' || data.type === 'area') {
            console.log(data);
            data.element.animate({
                d: {
                    begin: 600,
                    dur: 700,
                    // from: data.path.clone().stringify(),
                    from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                    to: data.path.clone().stringify(),
                    easing: Chartist.Svg.Easing.easeOutQuint
                }
            });
        } else if(data.type === 'point') {
            seq++;
            data.element.animate({
                opacity: {
                    begin: seq * delays,
                    dur: durations,
                    from: 1,
                    to: 1,
                    easing: 'ease'
                }
            });
        }
    });

    seq = 0;
}

export function startAnimationForBarChart(chart){

    chart.on('draw', (data) => {
        if(data.type === 'bar'){
            seq2++;
            data.element.animate({
                opacity: {
                    begin: seq2 * delays2,
                    dur: durations2,
                    from: 0,
                    to: 1,
                    easing: 'ease'
                }
            });
        }
    });

    seq2 = 0;
}