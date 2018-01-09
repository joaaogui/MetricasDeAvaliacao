from github import Github
import plotly
import plotly.plotly as py
from plotly.graph_objs import *
from collections import Counter
from pprint import pprint

# Create a Github instance:
g = Github("05f6acd2c70a44d115e64aa5bab6b870e83352b9")

# Find my user
user = g.get_user()

counter = 0
allc = 0
# Find the organization I want
org = g.get_organization("fga-gpp-mds")

# Get all repos from my account, including from organizations
repos = user.get_repos()

timer = org.get_repo("Falko-2017.2-BackEnd")
# timer = user.get_repo("timer")
signed_counter = 0
not_signed_counter = 0
all_commit_count = Counter()
date_counter = Counter()
signed_commit_count = Counter()

for commit in timer.get_commits():
    date_counter[commit.commit.author.date.date()] += 1
    all_commit_count[commit.commit.author.date.date()] += 1
    if "Merge" in commit.commit.message:
        all_commit_count[commit.commit.author.date.date()] -= 1
    if "Signed-off-by:" in commit.commit.message:
        signed_commit_count[commit.commit.author.date.date()] += 1
        signed_counter += 1
    else:
        not_signed_counter += 1
        signed_commit_count[commit.commit.author.date.date()] = 0


# print("Merges: " + str(counter))
# print("Rest: " + str(allc))
# print("Sum: %d" %(counter+allc))


# print(commit_count)
# pprint(commit_count.most_common())
# dates = list(sorted(commit_count.keys()))

dates = list(date_counter.keys())
dates.sort()
# print(dates)
all_commit_count = sorted(all_commit_count.items())
signed_commit_count = sorted(signed_commit_count.items())
all_amount_by_date = [x[1] for x in all_commit_count]
signed_amount_by_date = [x[1] for x in signed_commit_count]

# print("Commits com signed by off: " + str(sum(counter)))
# print("Todos commits: " + str(sum(allCommits)))


print("Data: " + str(len(dates)))
print("Todos Commits" + str(len(all_amount_by_date)))
print("Commits com signed:" + str(len(signed_amount_by_date)))

# Setting up plotly
plotly.tools.set_credentials_file(username='joaaogui', api_key='2TfVhKWEO6rpuxlj7c6R')
# Setting the privacy of the chart
plotly.tools.set_config_file(world_readable=True, sharing='public')

trace0 = Scatter(
    x=dates,
    y=all_amount_by_date
)
trace1 = Scatter(
    x=dates,
    y=signed_amount_by_date
)
data = Data([trace0, trace1])

py.plot(data, filename = 'signed-off-by whitout merges')
