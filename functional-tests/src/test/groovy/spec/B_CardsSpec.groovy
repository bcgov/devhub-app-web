package spec

import geb.spock.GebReportingSpec
import spock.lang.*

import pages.*

@Title("Devhub Homepage - Cards")
@Narrative("There are card containers and cards in the homepage")
@Stepwise
class  B_CardsSpec extends GebReportingSpec {
  def "I see the Cards Containers in the home page"(){
    given: "I go to the homepage"
    to HomePage

    when: "I have login"
    // missing authentication

    then: "I see the Cards Containers and Topics"
    at HomePage
    assert cardsContainers.size() == 5
    assert cardsLargeViews.size() == cardsContainers.size()
  }

  def "I see the topic of each Cards Container"(){
    when: "I go to the homepage"
    to HomePage

    then: "I see the Cards Container's Topics"
    assert cardsTopic[containerID].text() == containerTopic

    where:
    containerID   |containerTopic
    0             |"Design System"
    1             |"Signing Tool"
    2             |"Open Shift Wiki"
  }

  def "I can go to the github repo of each Cards Containers"(){
    when:"I go to the homepage"
    to HomePage

    and: "I click open the link of each cards container"
    cardContainerLinks(containerID)

    then: "I should be at the destination page"
    assert getCurrentUrl().contains(destinationURL)

    where:
    containerID   |destinationURL
    0             |"github.com/bcgov/design-system/"
    1             |"github.com/bcgov/devhub-signing-web/"
    2             |"github.com/BCDevOps/openshift-wiki"
  }

  def "I can see the full list of cards and collapse in each container"(){
    when:"I go to the homepage"
    to HomePage

    then: "I only see four cards"
    assert cardsInA.size() == 4
    
    and: "I click on Show All to see full list of cards in section A"
    toggleButton(0)

    then: "I see all the cards"
    assert cardsInA.size() == 9

    and: "I click on Collapse in section A"
    toggleButton(0)

    then: "I see collapsed cards"
    assert cardsInA.size() == 4
  }

  @Ignore('Unstable card order, not using cardIndex')
  def "I see individual Card in cards container - in section A"(){
    when:"I go to the homepage"
    to HomePage

    then: "I see the Card with correct info"
    assert cardsInA.size() == 4
    assert cardsInA[cardIndex].find("h2", title: cardTitle)
    assert cardsInA[cardIndex].find("h2").find("a").getAttribute('href').contains(destinationURL)

    where:
    cardIndex     |cardTitle          |destinationURL
    0             |"About"            |"design-system"
    2             |"Footer - Basic"   |"design-system"
    3             |"Header - Basic"   |"design-system"
  }

  def "I see individual Card in cards container - in section A"(){
    when:"I go to the homepage"
    to HomePage

    then: "I see the Card with correct info"
    assert cardsInA.find("h2", title: cardTitle)

    where:
    cardTitle          |destinationURL
    "About"            |"design-system"
    "Footer - Basic"   |"design-system"
    "Header - Basic"   |"design-system"
  }

  @Ignore('Dynamic content, not testing navigators atm')
  def "I can go to the detailed page of each individual Card - in A"(){
    when:"I go to the homepage"
    to HomePage

    and: "I click open each cards"
    at HomePage
    

    then: "I should be at the correct generated page"
    assert getCurrentUrl().contains(destinationURL)

    where:
    cardIndex     |destinationURL
    0             |"design-system/"
    1             |"design-system/"
    2             |"design-system/"
  }
}