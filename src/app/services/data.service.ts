import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"
import { Problem } from "../models/problem.model"

@Injectable({
    providedIn: 'root'
  })

export class DataService {
    constructor() { }

    private shareCategory = new BehaviorSubject<any>(null)
    private shareFilter = new BehaviorSubject<any>(null)

    private currentPage: string = 'feeds'
    private mark_problems: Problem[] = []

    setProblemsCategory(data: string) {
        this.shareCategory.next(data)
    }

    getProblemsCategory() {
        return this.shareCategory.asObservable()
    }

    setFilterProblems(data: string) {
        this.shareFilter.next(data)
    }

    getFilterProblems() {
        return this.shareFilter.asObservable()
    }

    setCurrentPage(page: string) {
        this.currentPage = page
    }

    getCurrentPage() {
        return this.currentPage
    }

    getMarkProblems() {
        return this.mark_problems
    }

    setMarkProblems(problems: Problem[]) {
        this.mark_problems = problems
    }
}