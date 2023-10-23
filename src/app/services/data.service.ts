import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"

@Injectable({
    providedIn: 'root'
  })

export class DataService {
    constructor() { }

    private shareCategory = new BehaviorSubject<any>(null)

    setProblemsCategory(data: string | undefined) {
        this.shareCategory.next(data)
    }

    getProblemsCategory() {
        return this.shareCategory
    }
}