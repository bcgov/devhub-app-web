package spec

import geb.spock.GebReportingSpec
import spock.lang.*

import pages.*

@Title("Devhub Homepage")
@Narrative("I can go to home page and login")
@Stepwise
class  A_HomePageSpec extends GebReportingSpec {
  def "I see the Cards Containers in the home page"(){
    when:"I go to the homepage"
    to HomePage

    then: "I am not logged in"

    and: "I click on login button"

    then: "I should be redirected to the login page"

    and: "I enter my credential and submit"
    // Dotenv dotenv = Dotenv.configure().directory("./").load()
    // IDIRusername = dotenv.get("IDIR_USERNAME")
    // IDIRpassword = dotenv.get("IDIR_PASSWORD")

    then: "I should be at homepage and logged in"
    at HomePage
  }
}
