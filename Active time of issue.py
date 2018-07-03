
# coding: utf-8

# In[30]:


from github import Github
from datetime import datetime, timedelta
import plotly.plotly as py
import plotly
from plotly.graph_objs import *
from collections import Counter


# In[37]:


# Create a Github instance:
g = Github("9324fedffc85017817ff2533e9237fc81fc611a9")

# Find my user
user = g.get_user()

# Find the organization I want
org = g.get_organization("fga-gpp-mds")

# Get all repos from my account, including from organizations
repos = user.get_repos()

# Get the repo, either from user or organization, uncomment the repo you want. (Only one repo can be uncommented)

# repo = org.get_repo("Falko-2017.2-BackEnd")
# repo = org.get_repo("2017.2-Receituario-Medico")
# repo = org.get_repo("2017.2-QueroCultura")
# repo = org.get_repo("2016.2-MissaoNascente")
# repo = org.get_repo("2017.2-Classificacao-de-Risco-Pediatrico")
# repo = org.get_repo("2017.1-PlataformaJogosUnB")
# repo = org.get_repo("2016.1-AbasteceAqui")
# repo = user.get_repo("timer")

with open('repos.txt') as f:
    lines = f.readlines()
    for line in lines:
        print(repr(line))
        line = line[:-1] 
        repo = org.get_repo(line)
        name = repo.name.replace('2018.1-','') 
        print(name)

        # In[95]:


        #
        # 2018.1
        #
        # repo = org.get_repo("2018.1_Gerencia_mais")
        # repo = org.get_repo("2018.1-Dr-Down")
        # repo = org.get_repo("2018.1-Dulce_App")
        # repo = org.get_repo("2018.1-TropicalHazards-BI")
        # repo = org.get_repo("2018.1-TropicalHazards-BI-FrontEnd")
        # repo = org.get_repo("2018.1_Nexte")
        # repo = org.get_repo("2018.1-Reabilitacao-Motora")
        # repo = org.get_repo("2018.1-VoxPop-WebApp")
        # repo = org.get_repo("2018.1-IncluCare_API")
        # repo = org.get_repo("2018.1-IncluCare")
        # repo = org.get_repo("2018.1-Lacos-da-Alegria")
        # repo = org.get_repo("2018.1-VoxPop-API")
        # repo = org.get_repo("2018.1-Cardinals")
        # repo = org.get_repo("2018.1-Dulce_API")
        # repo = org.get_repo("2018.1-Lacos-da-Alegria-API")


        # In[96]:


        issues = repo.get_issues(state="all")
        all_issues = []
        time_open = Counter()


        for issue in issues:
            if issue.pull_request == None:
                created_time = issue.created_at - timedelta(hours=2)
                if issue.state == "closed":
                    closed_time = issue.closed_at - timedelta(hours=2)
                else:
                    closed_time = datetime.now()
                all_issues.append(issue)
                
                time_open[(closed_time - created_time).days] += 1


        # In[97]:


        days = list(time_open.keys())
        days.sort()
        print(days)

        time_open = sorted(time_open.items())
        amount = [x[1] for x in time_open]
        print(amount)

        mean = sum(amount)/len(amount)

        label = repo.name
        label
        print(label)
        print(mean)


        # In[98]:


        # Setting up plotly
        plotly.tools.set_credentials_file(username='joaaogui', api_key='2TfVhKWEO6rpuxlj7c6R')
        # Setting the privacy of the chart
        plotly.tools.set_config_file(world_readable=True, sharing='public')

        data = [Bar(x=days,
                    y=amount)]

        title1 = "Active time of issues in project - " + label[7:] + " - Média: " + str(mean)

        layout = Layout(title=title1,
                        xaxis=dict(title='Days the issue was active'),
                        yaxis=dict(title='Amount of issues'))

        chart = Figure(data=data, layout=layout)

        py.image.save_as(chart, filename=name + '.png') 


        plotly.offline.plot(chart, filename = 'Active Time Of Issue', auto_open=True,
                            image_width=1280, image_height=800,
                            image_filename=name + '.png', image='svg')


        # py.iplot(chart, filename='basic_bar')

