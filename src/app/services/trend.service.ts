import { Injectable } from "@angular/core";
import { API_URLS } from "./environment";
import { Trend } from "../models/trend.model";

@Injectable({
    providedIn: 'root'
  })

export class TrendService { 
    async loadTrendsRate(): Promise<string> {
        const res = await fetch(`${API_URLS.trends}/on_rate`)
        return res.text()
    } 

    async updateTrend(problem_id: number, client_id: number, trend: Trend) {
        return fetch(`${API_URLS.problems}/${problem_id}/reaction_by/${client_id}`,
        {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(trend),  
        }).then (res => {
            if (res.ok) {
                console.log("trend updated.")
            } else {
                console.log("failed to update resource.")
            }
        })
    }
}