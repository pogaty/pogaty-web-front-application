import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"
import { Problem } from "../models/problem.model"
import { Trend } from "../models/trend.model"
import { dtsClient, dtsIdea } from "../components/application/app.component"
import { Idea } from "../models/idea.model"

@Injectable({
    providedIn: 'root'
  })

export class DataService {
    constructor() { }

    private ontrack = new BehaviorSubject<any>(null)
    private shareCategory = new BehaviorSubject<any>(null)
    private shareFilter = new BehaviorSubject<any>(null)
    private shareTrend = new BehaviorSubject<any>(null)
    private shareIdea = new BehaviorSubject<any>(null)

    private contentProblemOpen = new BehaviorSubject<any>(null)
    private updateProblem = new BehaviorSubject<any>(null)
    private updateIdea = new BehaviorSubject<any>(null)

    private isProblemOpen = new BehaviorSubject<boolean>(false)
    private isEditorMode = new BehaviorSubject<boolean>(false)
    private isManagement = new BehaviorSubject<dtsIdea>({bool: false, id: 0})
    private isIdeaOpen = new BehaviorSubject<dtsIdea>({bool:false, id: 0})
    private isProfileOpen = new BehaviorSubject<dtsClient>({bool: false, username: ''})

    private currentPage: string = 'feeds'
    private tmpProblemId: number = 0
    private mark_problems: Problem[] = []
    private my_problems: Problem[] = []
    private trendMap: { [key: number]: string } = {};

    private recieveIdea: string[] = []

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

    setShareTrend(data: any) {
        this.shareTrend.next(data)
    }

    getShareTrend() {
        return this.shareTrend.asObservable()
    }
   
    setProblemOpen(data: boolean) {
        this.isProblemOpen.next(data)
    }

    getProblemOpen() {
        return this.isProblemOpen.asObservable()
    }

    setManagement(data: dtsIdea) {
        this.isManagement.next(data)
    }

    getManagement() {
        return this.isManagement.asObservable()
    }

    setIdeaOpen(data: dtsIdea) {
        this.isIdeaOpen.next(data)
    }

    getIdeaOpen() {
        return this.isIdeaOpen.asObservable()
    }

    setProfileOpen(data: dtsClient) {
        this.isProfileOpen.next(data)
    }

    getProfileOpen() {
        return this.isProfileOpen.asObservable()
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

    setShareIdea(data: Idea) {
        this.shareIdea.next(data)
    }

    getShareIdea() {
        return this.shareIdea.asObservable()
    }

    setEditorMode(bool: boolean) {
        this.isEditorMode.next(bool)
    }

    getEditorMode() {
        return this.isEditorMode.asObservable()
    }

    setUpdateIdea(idea: Idea) {
        this.updateIdea.next(idea)
    }

    getUpdateIdea() {
        return this.updateIdea.asObservable()
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

    setTrendMap(problem_id: number, data: string) {
        this.trendMap[problem_id] = data
    }

    getTrendMap() {
        return this.trendMap
    }

    setTmpProblemId(id: number) {
        this.tmpProblemId = id
    }

    getTmpProblemId() {
        return this.tmpProblemId
    }

    setRecieveIdea(idea: string[]) {
        this.recieveIdea = idea
    }

    getRecieveIdea() {
        return this.recieveIdea
    }
}