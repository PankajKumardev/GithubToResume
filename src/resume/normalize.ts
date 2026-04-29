import type { RateLimit, ResumeData, UserResumeQueryResponse } from '@/resume/types';
import { aggregateLanguages, repoFromNode } from '@/lib/languageStats';

export function normalize(response: UserResumeQueryResponse): {
  data: ResumeData;
  rateLimit: RateLimit;
} {
  const u = response.user;
  if (!u) {
    throw new Error('USER_NOT_FOUND');
  }

  const pinned = u.pinnedItems.nodes.map(repoFromNode);
  const pinnedKeys = new Set(pinned.map((r) => r.fullName));

  const allRepos = u.repositories.nodes.map(repoFromNode);
  const topRepos = allRepos.filter((r) => !pinnedKeys.has(r.fullName)).slice(0, 8);

  const languages = aggregateLanguages(u.repositories.nodes, 8);

  const organizations = u.organizations.nodes.map((o) => ({
    login: o.login,
    name: o.name,
    avatarUrl: o.avatarUrl,
    url: o.url,
  }));

  const data: ResumeData = {
    profile: {
      login: u.login,
      name: u.name,
      bio: u.bio,
      avatarUrl: u.avatarUrl,
      location: u.location,
      company: u.company,
      email: u.email,
      website: u.websiteUrl,
      twitter: u.twitterUsername,
      joinedAt: u.createdAt,
      followers: u.followers.totalCount,
      following: u.following.totalCount,
    },
    stats: {
      totalCommits: u.contributionsCollection.totalCommitContributions,
      totalPRs: u.contributionsCollection.totalPullRequestContributions,
      totalIssues: u.contributionsCollection.totalIssueContributions,
      totalRepos: u.contributionsCollection.totalRepositoryContributions,
      totalContributionsLastYear:
        u.contributionsCollection.contributionCalendar.totalContributions,
      publicReposCount: u.repositories.totalCount,
    },
    languages,
    pinned,
    topRepos,
    organizations,
  };

  return { data, rateLimit: response.rateLimit };
}
