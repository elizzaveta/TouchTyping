'use client'
import React, {useEffect, useState} from 'react';
import {
    VictoryChart,
    VictoryGroup,
    VictoryLabel,
    VictoryLine,
    VictoryTheme, VictoryTooltip,
    VictoryVoronoiContainer
} from 'victory';
import {unixToStringHM, unixToStringYMD} from "@/functions/unixTimeConverter";
import {getUserWPM} from "@/functions/localStorage";
import styles from "./plot.module.css"


export default function Plot(props: { counter: number }) {
    const [data, setData] = useState<{x: number, y: number, time: Date}[]>([])

    useEffect(() => {
        refreshData();
    }, [props.counter])

    function refreshData() {
        setData(getUserWPM().map((wpm: {time: number,wpm: number},index: number) => {
            return {x: index, y: wpm.wpm, time: new Date(wpm.time)}
        }));
    }

    return (
        <div>
            <div className={styles.chart}>
                <VictoryChart
                    minDomain={{y: 0}} theme={VictoryTheme.material}
                    containerComponent={<VictoryVoronoiContainer/>}
                >
                    <VictoryLabel x={25} y={30} text={"wpm"}/>
                    <VictoryLabel x={310} y={300} text={"attempt"}/>
                    {data.length <2 && <VictoryLabel x={100} y={150} text={"Complete at least 2 lessons\n to see progress chart"}/>}

                    <VictoryGroup
                        labels={({datum}) => `${datum.y} wpm\n \n ${unixToStringYMD(datum.time)}\n ${unixToStringHM(datum.time)}`}
                        labelComponent={<VictoryTooltip/>}
                        data={data.length > 1? data : []}
                    >
                        <VictoryLine/>
                    </VictoryGroup>
                </VictoryChart>
            </div>
        </div>
    )
}