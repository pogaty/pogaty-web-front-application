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
              const res = await fetch(`${API_URLS.problems}/category/${category}`)
              if (res.ok) {
                const data = await res.json()
                resolve(data)
              } else {
                reject(console.log("can't find data."))
              }
            }, 1000)
        })
    }

    async loadProblemByMark(client_id: number): Promise<Problem[]> {
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
            try{
                const res = await fetch(`${API_URLS.problems}/mark_by/${client_id}`)
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

    async loadProblemByClient(client_id: number): Promise<Problem[]> {
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
            try{
                const res = await fetch(`${API_URLS.problems}/by/${client_id}`)
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

    async createNewPost(client_id: number, problem: any): Promise<void> {
      await fetch(`${API_URLS.problems}/by/${client_id}`, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(problem)
      }).then(res => {
        if (res.ok) {
          console.log("create problem successfully.")
        } else {
          console.log("failed to update resource.")
        }
      })
    }

    async updateNewPost(problem_id: number, problem: any): Promise<void> {
      await fetch(`${API_URLS.problems}/${problem_id}`, 
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(problem)
      }).then(res => {
        if (res.ok) {
          console.log("update problem successfully.")
        } else {
          console.log("failed to update resource.")
        }
      })
    }

    async deletePost(problem_id: number): Promise<void> {
      await fetch(`${API_URLS.problems}/${problem_id}`, 
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(res => {
        if (res.ok) {
          console.log("delete problem successfully.")
        } else {
          console.log("failed to update resource.")
        }
      })
    }

    markOn(problem_id: number, client_id: number) {
      fetch(`${API_URLS.problems}/${problem_id}/mark_on/${client_id}`,
      {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
      }).then (res => {
          if (res.ok) {
              console.log("mark on successfully.")
          } else {
              console.log("failed to update resource.")
          }
      })
    } 

    removeOn(problem_id: number, client_id: number) {
      fetch(`${API_URLS.problems}/${problem_id}/mark_by/${client_id}`,
      {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
      }).then (res => {
          if (res.ok) {
              console.log("remove on successfully")
          } else {
              console.log("failed to update resource.")
          }
      })
    } 
}