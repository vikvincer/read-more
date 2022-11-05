import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{

  @ViewChild('readMore') readMore: any;
  

  title = 'read-more';
  data = {
    title: 'Title',
    subtitle: 'Subtitle',
    contents: [
      {
        listContent: [
          {
            text: 'Lorem ipsum dolor sit amet consectetur sadfa asdf asdfasdfasd'
          },
          {
            text: '1Lorem ipsum dolor sit amet consecteturasdf asdfasd asdfsdaf88888'
          }
        ]
      },
      {
        listContent: [
          {
            text: 'Lorem ipsum dolor sit amet consecteturfasdf a'
          },
          {
            text: 'Lorem ipsum dolor sit amet consecteturasdfasdf '
          },
          {
            text: 'Lorem ipsum dolor sit amet consectetursdfasdf sadf asd f'
          }
        ]
      }
    ]
  };
  
  lineHeight = 20;
  maxLines = 5;
  maxHeight = this.lineHeight * this.maxLines;
  currentHeight = 0;
  setHeightStyle = `${this.maxHeight}px`;
  recordHTML: any;
  recordIndex = 0;
  constructor(){}

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.onLoadReadMore();
  }

  onLoadReadMore() {
    const getElements: HTMLCollection = this.readMore.nativeElement.getElementsByClassName('text-container');
    const elementsArray = Array.from(getElements);
    let targetContainer: Element = this.getTargetElement(elementsArray);
    this.transformContainer(targetContainer);
  }

  getTargetElement(elementsArray: any = []) {
    for (const [index, element] of elementsArray.entries()) {
      this.currentHeight += element.clientHeight;
      if (this.currentHeight >= this.maxHeight) {
        if (this.recordIndex === 0) {
          this.recordIndex = index;
        }
       
        return element;
      }
    }
  }

  transformContainer(element: Element) {
    const getTextElements = element.innerHTML;
    this.recordHTML = element?.innerHTML;
    const textToArray = getTextElements.split('');
    for (let index = textToArray.length; index >= 1; index--) {  
      element.innerHTML = getTextElements.substring(0, index);
      if ((this.currentHeight - element.clientHeight)  === this.maxHeight) {
        break;
      }
    }
  }

  readMoreContent():void {
    this.setHeightStyle = 'auto';
    // const getElements: HTMLCollection = this.readMore.nativeElement.getElementsByClassName('text-container');
    // const elementsArray = Array.from(getElements);
    // elementsArray[this.recordIndex].innerHTML = this.recordHTML;
  }

  readLess() {
    // this.recordIndex = 0;
    this.setHeightStyle = `${this.maxHeight}px`;
    // this.onLoadReadMore();
  }
}
