package pages

import geb.Page
import java.util.regex.*

class HomePage extends Page {
  // TODO: add title
  static at = { title == "" }

  static content = {
    cardsContainers (wait: true) {$("section[class^='src-components-Cards----Cards-module---CardsContainer']")}
    cardsTopic (wait: true) {$("div[class^='src-components-Cards----Cards-module---TopicContainer']")}
    cardsLargeViews (wait: true) {$("div[class^='src-components-Cards----Cards-module---LargeView']")}
    cardsInA (wait: true) {$(cardsLargeViews[0].find("article[class^='src-components-Cards-Card----Card-module---Card']"))}
  }

  def cardContainerLinks(index){
    cardsContainers[index].find("a", 0).click()
  }

  def groupOfCards(index){
    // groupOfCards(0) = cardsInA
    return cardsLargeViews[index].find("article[class^='src-components-Cards-Card----Card-module---Card']")
  }

  def toggleButton(index){
    cardsLargeViews[index].find("button[class*='src-components-UI-Button----Button-module---link']").click()
  }
}
