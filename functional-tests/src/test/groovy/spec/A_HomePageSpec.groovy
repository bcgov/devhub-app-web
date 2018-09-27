package spec

import geb.spock.GebReportingSpec
import spock.lang.*

import pages.*

@Title("Devhub Homepage")
@Narrative("I can go to home page")
@Stepwise
class  A_HomePageSpec extends GebReportingSpec {
  def "I see list of places in the home page"(){
    when:"I go to the homepage"
    to HomePage

    then: "I see Learning session"
    LearnButton
    DoButton
    DelieveyButton
  }
}