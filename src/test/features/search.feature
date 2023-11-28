Feature: Search on Google
    Background:
        Given I am on the Google search page

    Scenario: Search for '<search_term>'
        When I search for '<search_term>'
        Then the page title should start with '<search_term>'
        Examples:
            | search_term |
            | cheese      |
            | wine        |
            | cucumber    |