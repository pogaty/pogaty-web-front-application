import { Injectable } from "@angular/core"
import { Problem } from "../models/problem.model"
import { API_URLS } from "./environment"

@Injectable({
    providedIn: 'root'
  })

export class ProblemService {
    constructor() { }

    async loadProblems(): Promise<Problem[]> {
        return new Promise((resolve, reject) => {
          setTimeout(async () => {
            try {
              const res = await fetch(`${API_URLS.problems}`)
              if (res.ok) {
                const data = await res.json()
                resolve(data)
              } else {
                reject(new Error('Request failed'))
              }
            } catch (error) {
              reject(error)
            }
          }, 1000)
        })
      }

    async loadProblemsByCategory(category: string | undefined): Promise<Problem[]> {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try{
                    const res = await fetch(`${API_URLS.problems}/category/${category}`)
                    if (res.ok) {
                        const data = await res.json()
                        resolve(data)
                    } else {
                        reject(new Error('Request failed'))
                    }
                } catch (error) {
                    reject(error)
                }
            }, 1000)
        })
    }

    async loadTimedAgoByProblemId(id: number): Promise<string> {
        const res = await fetch(`${API_URLS.problems}/timed/${id}`)
        return res.text()
    }
}