import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"
import { Problem } from "../models/problem.model"

@Injectable({
    providedIn: 'root'
  })

export class DataService {
    constructor() { }

    private ontrack = new BehaviorSubject<any>(null)
    private shareCategory = new BehaviorSubject<any>(null)
    private shareFilter = new BehaviorSubject<any>(null)
    private contentProblemOpen = new BehaviorSubject<any>(null)
    private updateProblem = new BehaviorSubject<any>(null)
    private isProblemOpen = new BehaviorSubject<boolean>(false)
    

    private currentPage: string = 'feeds'
    private mark_problems: Problem[] = []
    private my_problems: Problem[] = []

    setOnTrack(data: number) {
        this.ontrack.next(data)
    }

    getOnTrack() {
        return this.ontrack.asObservable()
    }
    
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
   
    setProblemOpen(data: boolean) {
        this.isProblemOpen.next(data)
    }

    getProblemOpen() {
        return this.isProblemOpen.asObservable()
    }

    setProblemContent(data: string) {
        this.contentProblemOpen.next(data)
    }

    getProblemContent() {
        return this.contentProblemOpen.asObservable();
    }
    
    setUpdateProblem(data: any) {
        this.updateProblem.next(data)
    }

    getUpdateProblem() {
        return this.updateProblem.asObservable()
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
    
    getMyProblems() {
        return this.my_problems
    }

    setMyProblems(problems: Problem[]) {
        this.my_problems = problems
    }

}